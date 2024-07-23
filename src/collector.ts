import { SystemInfo, Sensor } from "./interface";

const SystemInfoStore: SystemInfo[] = [];

const SensorDataStore: Sensor[] = [];

function SystemInfoCollector(data: any) {
  SystemInfoStore.push(data);

  console.log("SysteminfoCollector", data);
}

function SensorCollector(data: any) {
  SensorDataStore.push(data);

  console.log("SensorCollector", data);
}

export {
  SystemInfoCollector,
  SensorCollector,
  SystemInfoStore,
  SensorDataStore,
};
