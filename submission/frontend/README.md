# PhishGuard AI – Frontend Application

## Overview

The PhishGuard AI frontend is a modern, responsive Single Page Application (SPA) built with **React 19** and **Vite**. It provides users with an intuitive, explainable interface to scan messages, inspect URL and psychological threat factors, review live dashboard telemetry, and examine audit histories.

---

## Key Features & Routes

- **`/` (Home)**: Modern landing page introducing PhishGuard AI's hybrid detection methodology, key capabilities, threat taxonomy, and quick start links.
- **`/scan` (Scan Messages)**: The primary scanning center containing:
  - **Manual Scan Tab**: Interactive text area for analyzing custom messages with one-click presets.
  - **Real-Time Stream Tab**: Simulation of an incoming mobile message stream with automatic threat detection and floating alert popups.
  - **Threat Preset Library**: Curated examples of benign, suspicious, and smishing attacks for live demonstration.
  - **Detailed Result Cards**: Visual 0–100 gauge, risk tier badge, URL inspection breakdown, detected social engineering badges, and natural language explanation/recommendation.
- **`/dashboard` (Dashboard)**: Real-time telemetry dashboard computing total scans, threat distribution (Safe vs. Suspicious vs. Phishing), average risk scores, and breakdown of detected manipulation tactics.
- **`/history` (History)**: Comprehensive audit log stored in browser `localStorage`. Supports keyword search, risk tier filtering, and history clearance.
- **`/about` (About)**: Detailed academic documentation screen displaying project architecture, dataset statistics (5,572 messages, 80/20 split), 97.58% benchmark baseline accuracy, team information, and system limitations.
- **`/auth` (Auth)**: Mock login/signup interface for simulating authenticated security analyst workflows.

---

## API Connection

The frontend communicates with the Flask backend via `src/services/api.js`:
- Base URL defaults to: `http://127.0.0.1:5000`
- `checkBackendStatus()`: Polls `GET /` to display live green/red connectivity status in the navbar.
- `predictMessage(text)`: Posts message to `POST /predict` and returns structured analysis.

---

## Real-Time Simulation Architecture

The real-time feature is driven by `src/services/realtimeDetectionService.js`:
- Simulates mobile SMS arrivals on an adjustable interval.
- Emits incoming messages to registered listeners.
- Invokes `POST /predict` in the background and logs the results directly into `localStorage`.
- Triggers the floating `RealTimeAlert.jsx` component whenever High or Critical risk messages arrive.

---

## How to Run the Frontend

1. Navigate to this directory:
   ```powershell
   cd frontend
   ```

2. Install Node.js dependencies:
   ```powershell
   npm install
   ```

3. Start the Vite development server:
   ```powershell
   npm run dev
   ```

4. Build for production:
   ```powershell
   npm run build
   ```
