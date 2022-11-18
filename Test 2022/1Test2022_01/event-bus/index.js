const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = []; 

//POST /events/: Event Bus Service um die Pakete vom Emplyoee Service an den Workflow Service weiterzuleiten. Benutzen sie dafür axios und die Async-Aufrufe wie in den Übungen gelernt
app.post("/events", async (req, res) => {
  const event = req.body;
  
  events.push(event);

  axios.post("http://localhost:4002/mf_employee", event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
