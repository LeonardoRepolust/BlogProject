const express = require("express");
const bodyParser = require("body-parser");
const axios = require("../../../Test 2022/2Test2022_02/bewertung/node_modules/axios");

const app = express();
app.use(bodyParser.json());

//0.1)
//leeres Arrays, wird durch /events Endpoint post befüllt
const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  //1)
  //speichern in der Liste
  events.push(event);

  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4003/events", event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });
});

//2)
//Endpoint der Liste wieder zurückgibt
app.get('/events', (req,res)=>{
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
