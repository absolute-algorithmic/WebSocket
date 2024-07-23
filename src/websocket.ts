import WebSocket from "ws";

const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: Number(PORT) });

wss.on("connection", (ws: WebSocket) => {
  console.log("New connection established");

  ws.on("message", (message: WebSocket.Data) => {
    const messageString = Buffer.isBuffer(message)
      ? message.toString()
      : message;
    console.log("Message received: ", messageString);
    ws.send("Hello!");
  });

  // https://datatracker.ietf.org/doc/html/rfc6455
  ws.on("close", (code: number, reason: Buffer) => {
    console.log(`Connection closed with code ${code} and reason ${reason}`);
  });

  ws.on("error", (error: Error) => {
    console.log("Error: ", error);
  });
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);

export default wss;
