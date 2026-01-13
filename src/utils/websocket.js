let socket = null;
let url = null;

function connect(wsUrl) {
  url = wsUrl;
  socket = new WebSocket(url);
  
  socket.onopen = () => {
    console.log('Connected to:', url);
  };
  
  socket.onclose = () => {
    console.log('Disconnected. Reconnecting in 2 seconds...');
    setTimeout(() => {
      connect(url);  // Reconnect
    }, 2000);
  };
  
  socket.onerror = (error) => {
    console.log('WebSocket error:', error);
  };
}

function send(data) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  } else {
    console.log('WebSocket not connected');
  }
}

export { connect, send };