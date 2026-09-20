// Base URL for the API, defaulting to localhost for development if not provided in .env
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  telemetryStream: `${API_BASE_URL}/api/telemetry/stream`,
};
