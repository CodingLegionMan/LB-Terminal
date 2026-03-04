const term = new Terminal();
const socket = new WebSocket((location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host);

term.open(document.getElementById('terminal'));
term.focus();

term.onData((data) => {
  socket.send(data);
});

socket.onmessage = (event) => {
  term.write(event.data);
};

socket.onerror = (err) => {
  console.error('WebSocket error', err);
};

socket.onclose = () => {
  term.write('\r\n*** Connection closed ***\r\n');
};
