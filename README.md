
# Vital Bites

A modern meal planning application with Ayurvedic principles.

## Prerequisites

- Node.js (v18 or higher)
- Python 3.8 or higher
- pip (Python package installer)

## Setup

1. Install frontend dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
python3 -m pip install --user -r api/requirements.txt
```

## Development

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run them separately:

Frontend only:
```bash
npm run dev:frontend
```

Backend only:
```bash
npm run dev:backend
```

The frontend will be available at http://localhost:5173
The backend API will be available at http://localhost:8000

## API Documentation

Once the backend is running, visit http://localhost:8000/docs for the interactive API documentation.
