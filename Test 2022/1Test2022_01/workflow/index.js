//js erweiterung, wichtig für unsere js rest requests
const express = require("express");
//json parser
const bodyParser = require("body-parser");
//for random ids
const { randomBytes } = require("crypto");
//needed for variable options in rest app
const cors = require("cors");
//lets you use async / await communication
const axios = require("../../2Test2022_02/bewertung/node_modules/axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

//Wenn ein MA erstellt wird, soll er/sie in der emplyees Variable gespeichert sein (wir simulieren eigene DB im Service)
const emplyees = {};

//GET / workflow /<mf_employee_id>: Liefert Daten zum angegebenen MA retour.
app.get("/workflow/:mf_employee_id", (req, res) => {
  res.send(emplyees[req.params.mf_employee_id] || []);
});

//POST /mf_employee/: ein neuer MA wird vom Event Bus an die Workflow Service weitergeleitet. Dieser wird in eine Locale Variable mf_employees gespeichert. Diese Liste ist äquivalent zu den emplyees Liste in dem Employee Service. Die Datenstruktur für den MA ist in beiden Services äquivalent.
app.post("/mf_employee", async (req, res) => {
  const { eventType, data } = req.body;

  if (eventType === "createEmplyee") {
    const {employeeId,employeeName,emplyeePosition} = data;
     
    //create on workflow
    emplyees[employeeId] = {
      employeeId,
      employeeName,
      emplyeePosition
    }
    
    res.send({ status: "OK" });

  } else if (eventType === "deleteEmplyee") {
      const { employeeId } = data;
      
      //delete on workflow
      delete emplyees[employeeId];
  } else {
    res.status(417).send();
  }

});

app.listen(4002, () => {
  console.log("Listening on 4002");
});
