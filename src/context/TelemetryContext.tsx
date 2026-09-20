import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_ENDPOINTS } from '../utils/config';

export interface TelemetryData {
  device_id: string;
  temperature: number;
  humidity: number;
  timestamp: string;
}

interface TelemetryContextType {
  data: TelemetryData;
  logs: TelemetryData[];
  connected: boolean;
}

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export const TelemetryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<TelemetryData>({ device_id: '-', temperature: 0, humidity: 0, timestamp: '' });
  const [logs, setLogs] = useState<TelemetryData[]>([]);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    const eventSource = new EventSource(API_ENDPOINTS.telemetryStream);

    eventSource.onopen = () => {
      console.log('Connected to SSE stream');
      setConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        if (parsedData.temperature !== undefined && parsedData.humidity !== undefined) {
          const newData = {
            device_id: parsedData.device_id || 'unknown',
            temperature: parsedData.temperature,
            humidity: parsedData.humidity,
            timestamp: parsedData.timestamp || new Date().toISOString()
          };
          setData(newData);
          setLogs(prevLogs => [newData, ...prevLogs].slice(0, 10)); // Keep last 10 logs
        }
      } catch (err) {
        console.error('Error parsing SSE data', err);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
      setConnected(false);
      // Let the browser handle the automatic reconnection for EventSource.
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <TelemetryContext.Provider value={{ data, logs, connected }}>
      {children}
    </TelemetryContext.Provider>
  );
};

export const useTelemetry = (): TelemetryContextType => {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }
  return context;
};
