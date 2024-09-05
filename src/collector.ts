import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { cwd } from "process";

import { SystemInfo, Sensor } from "./interface";

const SystemInfoStore: Map<string, SystemInfo & { sensor?: Omit<Sensor, 'id'>[] }> = new Map();
const SensorDataStore: Sensor[] = [];

const logDirectory = join(cwd(), 'logs');

function ensureLogDirectoryExists(): string {
    mkdirSync(logDirectory, { recursive: true });
    return logDirectory;
}

function SystemInfoCollector(data: SystemInfo) {
    try {
        SystemInfoStore.set(data.id, { ...data, sensor: [] });
    } catch (error) {
        console.error(`Error collecting system info for ID ${data.id}:`, error);
    }
}

// Collect sensor data
function SensorCollector(data: Sensor) {
    try {
        SensorDataStore.push(data);

        const systemInfo = SystemInfoStore.get(data.id);

        if (systemInfo) {
            const { id, ...sensorDataWithoutId } = data;

            if (!systemInfo.sensor) {
                systemInfo.sensor = [];
            }

            systemInfo.sensor.push(sensorDataWithoutId);
        } else {
            console.warn(`No system info found for sensor data with ID ${data.id}`);
        }
    } catch (error) {
        console.error(`Error collecting sensor data for ID ${data.id}:`, error);
    }
}

function finalizeAndWriteToFile() {
    try {
        const dirPath = ensureLogDirectoryExists();

        SystemInfoStore.forEach((systemInfo, id) => {
            if (!systemInfo.sensor?.length) {
                return;
            }

            systemInfo.sensor.sort((a, b) => a.timestamp - b.timestamp);

            writeFileSync(
                join(dirPath, `${id}-${Date.now()}.json`), JSON.stringify(systemInfo), 'utf8'
            );
        });
    } catch (error) {
        console.error('Error finalizing and writing system info and sensor data:', error);
    }
}

export {
    SystemInfoCollector,
    SensorCollector,
    finalizeAndWriteToFile
};
