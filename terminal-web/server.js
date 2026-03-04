const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const pty = require('node-pty');

// If not running as root, re-exec with sudo to grant root privileges to spawned shells.
if (process.getuid && process.getuid() !== 0) {
  const { spawn } = require('child_process');
  const args = process.argv.slice(1); // keep script path and any args
  console.log('restarting with sudo to obtain root privileges...');
  const child = spawn('sudo', ['node', ...args], { stdio: 'inherit' });
  child.on('exit', (code) => process.exit(code));
  return;
}

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

wss.on('connection', (ws) => {
  // spawn a bash shell (or /bin/sh if not available)
  const shell = process.platform === 'win32' ? 'powershell.exe' : 'bash';
  const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 24,
    cwd: process.env.HOME,
    env: process.env
  });

  ptyProcess.on('data', (data) => {
    ws.send(data);
  });

  ws.on('message', (msg) => {
    // messages from client to be written to the shell
    ptyProcess.write(msg);
  });

  ws.on('close', () => {
    ptyProcess.kill();
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Terminal server listening on http://localhost:${port}`);
});