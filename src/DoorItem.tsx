import React from "react";
import { Door } from "./models/Door";
import { Card, Image } from "react-bootstrap";

type Props = {
  door: Door;
  onClick: () => void;
};

export const DoorItem = ({ door, onClick }: Props) => (
  <Card
    style={{
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: "5%",
      width: "75%",
      height: "calc(width)"
    }}
  >
    <Card.Header>{door.name}</Card.Header>
    <Card.Body>
      <Image
        width="100%"
        height="100%"
        src={`${door.state}.png`}
        onClick={onClick}
      />
    </Card.Body>
  </Card>
);
