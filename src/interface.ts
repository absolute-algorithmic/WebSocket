interface Build {
  board: string;
  bootloader: string;
  brand: string;
  device: string;
  display: string;
  fingerprint: string;
  hardware: string;
  host: string;
  id: string;
  manufacturer: string;
  model: string;
  product: string;
  tags: string;
  type: string;
  user: string;
  version: Version;
}

interface Version {
  codename: string;
  incremental: string;
  release: string;
  sdk_int: number;
}

interface Screen {
  density: number;
  heightPixels: number;
  widthPixels: number;
}

export interface SystemInfo {
  build: Build;
  id: string;
  messageType: string;
  perfBench: string[];
  screen: Screen;
  sensorList: string[];
}

export interface SensorData {
  accuracy: number;
  messageType: string;
  timestamp: number;
  type: number;
  x: number;
  y: number;
  z: number;
}
