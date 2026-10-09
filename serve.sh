#!/bin/sh
set -e

# Start Tor in background if available (optional on free-tier hosts like Render)
if command -v tor >/dev/null 2>&1; then
  echo "[InvisiProxy] Starting Tor in background..."
  tor &
  # Give Tor a moment to bootstrap (non-blocking)
  sleep 2
else
  echo "[InvisiProxy] Tor not found, continuing without Onion routing support."
fi

echo "[InvisiProxy] Starting server on PORT=${PORT:-8080}..."
exec pnpm start
