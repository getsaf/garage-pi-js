import React, { useState, useEffect } from "react";
import { DoorItem } from "./DoorItem";
import { DoorService } from "./services/DoorService";
import { Door } from "./models/Door";

const doorService = new DoorService();

const App: React.FC = () => {
  const [doors, setDoors] = useState([] as Door[]);

  useEffect(() => {
    const loadDoors = async () => {
      setDoors(await doorService.getDoors());
      setTimeout(loadDoors, 5000);
    };
    loadDoors();
  }, []);

  return (
    <div style={{ padding: 10 }}>
      {doors.map(door => (
        <DoorItem
          key={door.name}
          door={door}
          onClick={() => doorService.toggleDoor(door.name)}
        />
      ))}
    </div>
  );
};

export default App;
