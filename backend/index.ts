import cors from "cors";
import express from "express";
import * as sqlite from "sqlite";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";

console.log("startar express");
const app = express();

app.use(cors());
app.use("/staff_IMG", express.static(path.join(__dirname, "staff_IMG")));

let database;
(async () => {
  const database = await sqlite.open({
    driver: sqlite3.Database,
    filename: "database.sqlite",
  });

  await database.run("PRAGMA foreign_keys = ON");

  app.get("/routes", async (request, response) => {
    const routeName = await database.all("SELECT * FROM routes");
    response.send(routeName);
  });

  app.use(express.json());

  app.get("/timetable", async (request, response) => {
    const getTimetable = await database.all(`SELECT * FROM timetable`);

    response.send(getTimetable);
  });

  app.get("/contact", async (request, response) => {
    const getContacts = await database.all(`SELECT * FROM staff`);

    response.send(getContacts);
  });
})();

app.listen(8080, () => {
  console.log(`Redo på http://localhost:8080/`);
});
