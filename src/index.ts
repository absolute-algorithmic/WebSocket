import WebSocket from "ws";

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// New connection
wss.on("connection", (ws: WebSocket) => {
  console.log("New connection");
});
