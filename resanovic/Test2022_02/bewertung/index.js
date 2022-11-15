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

const bewertungen = {};

//bewertung / <UID> Zeige alle Bewertungen eins Unternehmens an.
//(mit UID-Id des Unternehmens als Input)
app.get("/bewertung/:UID", (req,res) => {
    const bewertungenUID = {};
    const uid = req.params.UID;

    for (var key in bewertungen) {
        if(bewertungen[key].uid===uid)
        {
            bewertungenUID[key]=bewertungen[key];
        }
    }
    res.status(201).send(bewertungenUID);
});

//bewertung /<UID> Lege eine neue Unternehmensbewertung an.
//Als Ergebnis soll das neu erzeugte und gespeicherte Objekt retourniert werden.
//(mit UID-Id des Unternehmens als Input)
app.post("/bewertung/:UID", (req,res) => {
    const bid = randomBytes(4).toString("hex");
    const uid = req.params.UID;
    const { beschreibung, prozentzahl } = req.body;
    bewertungen[bid]={
        uid,
        beschreibung,
        prozentzahl
    }
    res.status(201).send(bewertungen[bid]);
});

//bewertung /<UID> Aktualisiere eine Bewertung: nur Beschreibung und Bewertung
//sollen aktualisiert werden können, das Unternehmen nicht.
//Als Ergebnis soll das aktualisierte Objekt retourniert werden.
//(mit BID-Id der Bewertung als Input)
app.put("/bewertung/:UID", (req,res) => {
    const { beschreibung, prozentzahl } =req.body;
    const uid = req.params.UID;

    for(var key in bewertungen){
        if(key===uid){
            bewertungen[key].beschreibung=beschreibung;
            bewertungen[key].prozentzahl=prozentzahl;
            break;
        }
    }
    res.status(201).send(bewertungen[uid]);
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
