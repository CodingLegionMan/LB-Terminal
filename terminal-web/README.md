# Linux Terminal Web

A minimal standalone web application that provides a Linux-like terminal using [xterm.js](https://xtermjs.org/) on the client and [`node-pty`](https://github.com/microsoft/node-pty) on the server. It avoids VNC/NoVNC for simplicity and low-latency.

## Getting Started

1. **Install dependencies**
   ```bash
   cd terminal-web
   npm install
   ```

2. **Run the server**
   ```bash
   # regular start (forwards port automatically if gh is available)
   npm start
   ```
   or
   ```bash
   # explicit wrapper script that also forwards the port
   npm run start:forward
   ```

3. **Open in browser**
   Navigate to `http://localhost:3000` (or your container's forwarded port). You should see a fully interactive shell.

> **Note:** Running this exposes a shell on the server; use responsibly and only in trusted environments.

> **Root privileges:** the server will attempt to restart itself using `sudo` if it's not already running as root. You can also start it manually with `sudo npm start` to ensure the web terminal has full root access.

## Customization

- Modify `server.js` to change the shell, set resource limits, or add authentication.
- Add additional frontend styling/scripts in `public/` as needed.

Enjoy your web-accessible terminal! 🚀