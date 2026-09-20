import { useState, useEffect } from 'react'
import Gauge from './components/Gauge'
import { useTelemetry } from './context/TelemetryContext'
import './index.css'

function App() {
  const { data, logs, connected } = useTelemetry();
  const [isLightMode, setIsLightMode] = useState<boolean>(false);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="header">
          <h1>IoT Monitor</h1>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {isLightMode ? '🌙' : '☀️'}
          </button>
        </div>
        
        <div className="status-indicator">
          <div className={`status-dot ${connected ? 'connected' : ''}`}></div>
          {connected ? 'Connected (Live)' : 'Disconnected (Reconnecting...)'}
        </div>

        <div className="gauges-wrapper">
          <Gauge 
            label="Temperature" 
            value={data.temperature} 
            unit="°C" 
            type="temperature" 
          />
          <Gauge 
            label="Humidity" 
            value={data.humidity} 
            unit="%" 
            type="humidity" 
          />
        </div>

        {/* Log Table */}
        <div className="logs-section">
          <h2>Recent Logs</h2>
          <table className="log-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Device ID</th>
                <th>Temperature</th>
                <th>Humidity</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center' }}>No data yet...</td>
                </tr>
              ) : (
                logs.map((log, index) => (
                  <tr key={index}>
                    <td>{new Date(log.timestamp).toLocaleTimeString()}</td>
                    <td>{log.device_id}</td>
                    <td>{log.temperature.toFixed(1)} °C</td>
                    <td>{log.humidity.toFixed(1)} %</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
