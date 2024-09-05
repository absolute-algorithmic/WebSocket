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

  ws.on("message", (message: WebSocket.Data) => {
    let messageString: string;

    if (typeof message === "string") {
      messageString = message;
    } else if (Buffer.isBuffer(message)) {
      messageString = message.toString();
    } else {
      console.log("Invalid message type: ", typeof message);
      return;
    }

    if (!messageString || messageString === "") {
      console.log("Empty message received");
      return;
    }
    try {
      const data = JSON.parse(messageString);

      const handler = messageHandler[data.messageType];

      if (handler) {
        handler(data);
      } else {
        console.log("Unknown message type received");
      }

      // Save the data to a file "data.json" for debugging purposes
      fs.writeFileSync("./collector/data.json", JSON.stringify(data, null, 2));
      
     // console.log("Received message: ", data);
    } catch (error) {
      console.error("Error parsing JSON: ", error);
    }
  });

  // https://datatracker.ietf.org/doc/html/rfc6455
  ws.on("close", (code: number, reason: Buffer) => {
    console.log(
      `Connection closed with code ${code} and reason ${
        reason || "No reason provided"
      }`
    );
  });

  ws.on("error", (error: Error) => {
    console.log("Error: ", error);
  });
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);

export default wss;