import express from "express";
import { currentConfig } from "./app/models/Config";
import { Door } from "./app/models/Door";

const app = express();

const { port, users, garage } = currentConfig;
const doors: Door[] = garage.doors.map(doorConfig => new Door(doorConfig));

if (process.env.NODE_ENV !== 'development') {
  app.all("/*", (req, res, next) => {
    res.contentType("application/json");
    const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
    const [username, password] = Buffer.from(b64auth, "base64").toString().split(":");
    const user = users.find( user => user.username === username && user.password === password);
    if (user) {
      console.log(user.username, req.method, req.url);
      next();
    } else {
      return res.sendStatus(401);
    }
  });
}

app.use('/', express.static('build'));

app.get("/door", (_req, res) => {
  res.send(doors.map(door => ({name: door.config.name, state: door.state})));
});

app.get("/door/:name", (req, res) => {
  const door = doors.find(d => d.config.name == req.params.name);
  return door
    ? res.send({ name: door.config.name, state: door.state })
    : res.sendStatus(404);
});

app.post("/door/:name/:action", (req, res) => {
  const door = doors.find(d => d.config.name == req.params.name);
  if (!door) {
    res.sendStatus(404);
  } else {
    const action = req.params.action.toLowerCase();
    if (action === "open") {
      door.open();
    } else if (action === "close") {
      door.close();
    } else if (action === "toggle") {
      door.toggle();
    } else {
      return res.sendStatus(400);
    }
    res.sendStatus(204);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
