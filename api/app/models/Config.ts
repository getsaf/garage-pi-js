import config from "../../config.json";

export type UserConfig = {
  username: string;
  password: string;
};

export type DoorConfig = {
  name: string;
  sensorPin: number;
  triggerPin: number;
  invertSensor: boolean;
  toggleDuration: number;
};

export type Config = {
  users: UserConfig[];
  port: number;
  garage: {
    doors: DoorConfig[];
  };
};

export const currentConfig: Config = config;
