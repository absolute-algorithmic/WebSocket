import WebSocket from "ws";

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// New connection
wss.on("connection", (ws: WebSocket) => {
  console.log("New connection");
});

// On message
wss.on("message", (message: WebSocket.Data) => {
  console.log("Message received: ", message);
});

// On close
wss.on("close", () => {
  console.log("Connection closed");
});

// On error
wss.on("error", (error: Error) => {
  console.log("Error: ", error);
});
