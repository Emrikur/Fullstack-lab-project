import cors from 'cors'
import express from 'express'
import * as sqlite from 'sqlite'
import { Database } from 'sqlite'
import sqlite3 from 'sqlite3'


console.log("startar express")
const app = express()

app.use(cors())

let database
 ;(async () => {
  const database = await sqlite.open({
    driver: sqlite3.Database,
    filename:'database.sqlite'
  })

  await database.run('PRAGMA foreign_keys = ON')


app.get("/", async (request, response) =>{

  const userGreetings = await database.all("SELECT * FROM greetings");


  response.send(userGreetings);

});
})()
app.listen(8080, () => {
  console.log("Redo på http://localhost:8080/")

  })
