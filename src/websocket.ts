import WebSocket from "ws";
import { SensorCollector, SystemInfoCollector } from "./collector";

import fs from "fs/promises";
import path from "path";

const PORT = Number(process.env.PORT) || 8080;

const wss = new WebSocket.Server({ port: PORT });

const messageHandler: { [key: string]: (data: any) => void } = {
  systemInfo: SystemInfoCollector,
  sensor: SensorCollector,
};


wss.on("connection", (ws: WebSocket) => {
  console.log("New connection established");

  ws.on("message", (message: WebSocket.Data) => {
    const messageString = Buffer.isBuffer(message) ? message.toString() : message;

    if (typeof messageString !== "string" || !messageString.trim()) {
      console.log("Invalid or empty message received");
      return;
    }

    try {
      const data = JSON.parse(messageString);
      const handler = messageHandler[data.messageType];
      if (handler) {
        handler(data);
      } else {
        console.log("Unknown message type received: ", data.messageType);
      }

    } catch (error) {
      console.error("Error parsing JSON: ", error);
    }
  });

  ws.on("close", (code: number, reason: Buffer) => {
    console.log(`Connection closed with code ${code}`);
  });

  ws.on("error", (error: Error) => {
    console.error("WebSocket error: ", error);
  });
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);

export default wss;
