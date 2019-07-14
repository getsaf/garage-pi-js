import { Gpio } from "./GpioWrapper";
import { DoorConfig } from "./Config";

type ToggleState = "Opening" | "Closing";
export type DoorState = "Open" | "Closed" | ToggleState;

export class Door {
  sensor = new Gpio(this.config.sensorPin, { mode: Gpio.INPUT, pullUpDown: Gpio.PUD_UP});
  trigger = new Gpio(this.config.triggerPin, { mode: Gpio.OUTPUT });

  get isOpen() {
    const isHigh = this.sensor.digitalRead() === 1;
    return this.config.invertSensor ? !isHigh : isHigh;
  }

  get isClosed() {
    return !this.isOpen;
  }

  get isOpening() {
    return this._toggleState === "Opening";
  }

  get isClosing() {
    return this._toggleState === "Closing";
  }

  get state(): DoorState {
    if (this.isOpening) {
      return "Opening";
    } else if (this.isClosing) {
      return "Closing";
    } else if (this.isOpen) {
      return "Open";
    }
    return "Closed";
  }

  constructor(public config: DoorConfig) {
    this.trigger.digitalWrite(1);
  }

  toggle() {
    if (!this._toggleState) {
      this.trigger.digitalWrite(0);
      setTimeout(() => this.trigger.digitalWrite(1), 300);
      this._toggleState = this.isOpen ? "Closing" : "Opening";
      setTimeout(
        () => (this._toggleState = undefined),
        this.config.toggleDuration * 1000
      );
    }
  }

  open() {
    if (["Open", "Opening"].includes(this.state)) {
      console.warn(
        `Tried to open Door ${this.config.name} but it is currently ${
          this.state
        }`
      );
    } else {
      console.log(`Opening Door ${this.config.name}`);
      this.toggle();
    }
  }

  close() {
    if (["Closed", "Closing"].includes(this.state)) {
      console.warn(
        `Tried to close Door ${this.config.name} but it is currently ${
          this.state
        }`
      );
    } else {
      console.log(`Closing Door ${this.config.name}`);
      this.toggle();
    }
  }

  private _toggleState?: ToggleState;
}
