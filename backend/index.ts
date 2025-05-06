import cors from "cors";
import express from "express";
import * as sqlite from "sqlite";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";

console.log("startar express");
const app = express();

app.use(cors());

let database;
(async () => {
  const database = await sqlite.open({
    driver: sqlite3.Database,
    filename: "database.sqlite",
  });

  await database.run("PRAGMA foreign_keys = ON");

  app.get("/", async (request, response) => {
    const routeName = await database.all("SELECT * FROM routes");
    //console.log(stationName)


    response.send(routeName);
  });

  app.use(express.json());

  app.post("/", async (request, response) => {

//TODO: Oklart vad jag försöker få ut av den här posten...

    const getStations = await database.all(`SELECT * FROM stations WHERE name=?`,[request.body.to]);
    getStations[0].id
    console.log(request.body)
    //console.log(request.body) */
    //const hej = `Traveling from ${request.body.from} to ${request.body.to}`
    //const setTrip = await database.all("SELECT * FROM stations");


   response.send(getStations);
  });
  app.get("/timetable", async (request, response) => {

    const getTimetable = await database.all(`SELECT * FROM timetable`);
    //console.log(getTimetable)
    //console.log(request.body) */
    //const hej = `Traveling from ${request.body.from} to ${request.body.to}`
    //const setTrip = await database.all("SELECT * FROM stations");


   response.send(getTimetable);
  });
})();

app.listen(8080, () => {
  console.log("Redo på http://localhost:8080/");
});
