# Low-Bandwidth Offline-Resilient Telemedicine Application

A lightweight, high-availability telemedicine solution designed specifically for low-bandwidth and unstable network environments (2G/3G connectivity).

## Key Features

* **Low-Bandwidth Video Streaming**: Peer-to-peer WebRTC video calls constrained to 640x480 resolution at 15fps (~200-300 kbps consumption).
* **Offline-First Data Persistence**: Diagnostic notes and consultation records are stored locally using Dexie.js (IndexedDB) and auto-synced once connection is restored.
* **Fallback Messaging**: Twilio SMS support for essential consultation alerts and notifications.

## Tech Stack

* **Frontend**: Next.js, React, Dexie.js (IndexedDB)
* **Backend**: FastAPI, Python Socket.IO (Signaling Server)
* **Protocols**: WebRTC, WebSockets

## Running Locally

### Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
