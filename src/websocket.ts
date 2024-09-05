import WebSocket from "ws";
import { SensorCollector, SystemInfoCollector } from "./collector";
import fs from "fs";
const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: Number(PORT) });

const messageHandler: { [key: string]: (data: any) => void } = {
  systemInfo: SystemInfoCollector,
  sensor: SensorCollector,
};

wss.on("connection", (ws: WebSocket) => {
  console.log("New connection established");

  let invalidMessages = 0;

  ws.on("message", (message: WebSocket.Data) => {
    try {
      let messageString = typeof message === "string" ? message : message.toString();

      if (!messageString) throw new Error("Empty message received");

      const data = JSON.parse(messageString);

      if (!data.messageType || typeof data.messageType !== "string") {
        ws.send(JSON.stringify({ error: "Invalid data format: 'messageType' is required" }));
        return;
      }

      const handler = messageHandler[data.messageType];

      if (!handler) {
        invalidMessages++;
        throw new Error(`Unknown message type: ${data.messageType}`);
      }

      invalidMessages = 0;
      handler(data);

      fs.writeFile("./collector/data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) {
          console.error("Error writing to file: ", err);
        }
      });

    } catch (error) {
      console.error("Error handling message: ", (error as Error).message);
      ws.send(JSON.stringify({ error: (error as Error).message }));

      if (invalidMessages >= 3) {
        console.log("Too many invalid messages, closing connection");
        ws.close(1003, "Too many invalid messages");
      }
    }
  });

  ws.on("close", (code: number, reason: Buffer) => {
    console.log(
      `Connection closed with code ${code} and reason ${
        reason.toString() || "No reason provided"
      }`
    );
  });

  ws.on("error", (error: Error) => {
    console.error("Error: ", error);
  });
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);

export default wss;
