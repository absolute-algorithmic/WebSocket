import WebSocket from "ws";

const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: Number(PORT) });

wss.on("connection", (ws: WebSocket) => {
  console.log("New connection");

  ws.on("message", (message: WebSocket.Data) => {
    console.log("Message received: ", message);
  });

  ws.on("close", () => {
    console.log("Connection closed");
  });

  ws.on("error", (error: Error) => {
    console.log("Error: ", error);
  });
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);

export default wss;
