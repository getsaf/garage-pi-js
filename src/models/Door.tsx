type DoorState = "open" | "opening" | "closed" | "closing";

export type Door = {
  name: string;
  state: DoorState;
};
