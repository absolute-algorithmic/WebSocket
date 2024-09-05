import { SystemInfo, Sensor } from "./interface";

const SystemInfoStore: SystemInfo[] = [];

const SensorDataStore: Sensor[] = [];

function SystemInfoCollector(data: any) {
  SystemInfoStore.push(data);
}

function SensorCollector(data: any) {
  SensorDataStore.push(data);
}

export {
  SystemInfoCollector,
  SensorCollector,
  SystemInfoStore,
  SensorDataStore,
};
