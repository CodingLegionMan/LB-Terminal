#!/usr/bin/env bash
# wrapper to start server and forward port via gh

# forward 3000 if gh CLI present
if command -v gh >/dev/null 2>&1; then
  echo "forwarding port 3000 through codespace..."
  gh codespace ports forward 3000:3000 2>/dev/null || true
fi

# start the node server (which itself may escalate with sudo)
npm start
