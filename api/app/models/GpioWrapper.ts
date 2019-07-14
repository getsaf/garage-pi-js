import process from "process";
import { Gpio as GpioType } from "../../../node_modules/@types/pigpio";

export const Gpio: typeof GpioType =
  process.env.NODE_ENV !== "development"
    ? require("pigpio").Gpio
    : (class {
        private _state = 0;
        digitalRead() {
          return this._state;
        }
        digitalWrite(value: 0 | 1) {
          this._state = value;
        }
      } as any);
