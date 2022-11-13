//js erweiterung, wichtig für unsere js rest requests
const express = require("express");
//json parser
const bodyParser = require("body-parser");
//for random ids
const { randomBytes } = require("crypto");
//needed for variable options in rest app
const cors = require("cors");
//lets you use async / await communication
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

//Wenn ein MA erstellt wird, soll er/sie in der emplyees Variable gespeichert sein (wir simulieren eigene DB im Service)
const emplyees = {};

//Entwickeln Sie einen Employee Service mit REST-API (URL-Pfad: /package), welcher folgende Funktionen umfasst:
//POST /:positionID/emplyoee/: ein neuer MA wird angestellt.
app.post("/package/:positionID/emplyoee", async  (req, res) => {

  const employeeId = randomBytes(4).toString("hex");
  const {employeeName} = req.body;
  const emplyeePosition = req.params.positionID;

  //PositionID steht für die Job Position und kann folgende Werte haben (1-Engineer, 2-Support, 3- Verwaltung, 4-Rest).
  if(between(emplyeePosition,1,4)){
      emplyees[employeeId] = {
        employeeId,
        employeeName,
        emplyeePosition
      };
    
      //Danach wird ein Event (siehe oben die Stuktur) an den Event Bus weitergeleitet. POST /events/
     await axios.post("http://localhost:4001/events", {
        eventType: "createEmplyee",
        data: 
        {
          employeeId: employeeId,
          employeeName: employeeName,
          emplyeePosition: emplyeePosition
        },
      });

      res.status(201).send(emplyees);

  } else {
    //Falls der neue MA eine falsche Position bekommt, wird ein HTTP-417-Statuscode retourniert.
    res.status(417).send();
  }
});

function between(x, min, max) {
  return x >= min && x <= max;
}

//DELETE / emplyee /<emplyee_id>:
//Entfernt den MA aus dem Unternehmen (aus der employees Variable) und retourniert die Daten des MA.
app.delete("/package/emplyee/:emplyee_id",async (req, res) => {

  const employeeId = req.params.emplyee_id;
  const { employeeName,emplyeePosition } = req.body;

  delete emplyees[employeeId];
  //Danach wird ein Event (siehe oben die Stuktur) an den Event Bus weitergeleitet. POST /events/
  await axios.post("http://localhost:4001/events", {
    eventType: "deleteEmplyee",
    data: 
    {
      employeeId: employeeId,
      employeeName: employeeName,
      emplyeePosition: emplyeePosition
    },
  });
  res.status(201).send(emplyees);
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
