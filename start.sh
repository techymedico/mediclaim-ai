#!/bin/bash
echo "Starting Medical Insurance Intelligence System..."

# Load env vars
if [ -f .env ]; then
  source .env
fi

# Check for API Key
if [ -z "$GEMINI_API_KEY" ]; then
    echo "Please enter your Gemini API Key:"
    read api_key
    export GEMINI_API_KEY=$api_key
fi

# Cleanup previous processes
pkill -f "uvicorn"
pkill -f "vite"

# Start Backend
echo "Starting Backend (FastAPI)..."
source venv/bin/activate
# Run from root so relative paths like 'backend/data/' work
nohup uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000 > backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend running (PID: $BACKEND_PID)"


# Start Frontend
echo "Starting Frontend (React/Vite)..."
cd frontend
# Run in background
nohup npm run dev -- --host > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend running (PID: $FRONTEND_PID)"
cd ..

echo "------------------------------------------------"
echo "Application started!"
echo "Backend:  http://localhost:8000/docs"
echo "Frontend: http://localhost:5173"
echo "------------------------------------------------"
echo "Logs are being written to backend.log and frontend.log"
echo "Press Ctrl+C to stop servers (manually)"

# Keep script running to show logs or just exit? 
# Let's just tail the logs
tail -f backend.log frontend.log
