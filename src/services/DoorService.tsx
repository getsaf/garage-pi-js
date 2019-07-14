import { Door } from "../models/Door";

export class DoorService {
  private async _doorAction(
    doorName: string,
    action: "open" | "close" | "toggle"
  ) {
    await fetch(`${this._baseUrl}/door/${doorName}/${action}`, {
      method: "POST"
    });
  }

  constructor(private _baseUrl: string = "") {}

  async getDoors() {
    const response = await fetch(`${this._baseUrl}/door`);
    return (await response.json()) as Door[];
  }

  async toggleDoor(doorName: string) {
    return this._doorAction(doorName, "toggle");
  }

  async openDoor(doorName: string) {
    return this._doorAction(doorName, "open");
  }

  async closeDoor(doorName: string) {
    return this._doorAction(doorName, "close");
  }
}
