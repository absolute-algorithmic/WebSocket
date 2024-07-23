import { SystemInfo, SensorData } from "./interface";

const SensorDataStore: SensorData[] = [];

const SystemInfoStore: SystemInfo[] = [];

function SystemInfoCollector(data: any) {
  SystemInfoStore.push(data);

  console.log("SysteminfoCollector", data);
}

function SensorCollector(data: any) {
  SensorDataStore.push(data);

  console.log("SensorCollector", data);
}

export { SystemInfoCollector, SensorCollector, SystemInfoStore, SensorDataStore };
