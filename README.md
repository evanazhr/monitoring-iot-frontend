# IoT Monitoring Frontend

This project is the frontend dashboard for monitoring IoT telemetry data (Temperature and Humidity) using a modern, skeuomorphic design.

## Features
- **Real-time Updates**: Connects to the backend via Server-Sent Events (SSE) for instant data synchronization.
- **Skeuomorphic Design**: High-quality UI resembling physical gauges with support for both Dark and Light themes.
- **Context API**: Uses React Context (`TelemetryContext`) for clean state management and data fetching.
- **Environment Variables**: Easily configurable backend connection.

## Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (or npm/yarn)

## Installation

1. Install the dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. Configure environment variables:
   Copy the example environment file and update it if your backend runs on a different port/host.
   ```bash
   cp .env.example .env
   ```
   *By default, it connects to `http://localhost:3000`.*

## Running the Application

To start the development server:
```bash
npm run dev
# or
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the dashboard.

## Project Structure
- `src/components/`: Reusable UI components (e.g., `Gauge.tsx`).
- `src/context/`: React Context providers for global state management (`TelemetryContext.tsx`).
- `src/utils/`: Utility functions and configuration (`config.ts`).
- `src/App.tsx`: The main dashboard layout and theme toggle logic.
- `src/index.css`: Global styles and skeuomorphic design tokens.
