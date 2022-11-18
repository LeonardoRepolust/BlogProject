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

const unternehmen = {};

//unternehmen Lege ein neues Unternehmen an. Als Ergebnis soll das neu 
//erzeugte und gespeicherte Objekt retourniert werden.
app.post("/unternehmen",  (req, res) => {
    const uid = randomBytes(4).toString("hex");
    const {name,adresse} = req.body;
    unternehmen[uid]={
        uid,
        name,
        adresse
    }
    res.status(201).send(unternehmen[uid]);
});

//unternehmen Zeige alle Unternehmen an
app.get("/unternehmen", (req,res) => {
    res.status(201).send(unternehmen);
});

/// unternehmen/<UID> Zeige ein bestimmtes Unternehmen an
app.get("/unternehmen/:UID", (req,res) => {
    res.status(201).send(unternehmen[req.params.UID]);
});

//unternehmen/<UID> Aktualisiere ein Unternehmen: nur Adresse und Ort 
//sollen aktualisiert werden können, der Name nicht. 
//Als Ergebnis soll das aktualisierte Objekt retourniert werden.
app.put("/unternehmen/:UID", (req,res) =>{
    const {adresse} = req.body;
    const uid = req.params.UID

    for (var key in unternehmen) {
        if(unternehmen[key].uid===uid)
        {
            unternehmen[key].adresse=adresse;
            break;
        }
    }
    res.status(201).send(unternehmen[uid])
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
