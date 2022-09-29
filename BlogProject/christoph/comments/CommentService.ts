import Comment from "../interfaces/Comment";
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

const app: Express = express();
app.use(bodyParser.json())
var cors = require('cors')
app.use(cors())

const port = 8081;


const comments: Comment[] = [
    { id: 1, postID: 2, body: "TESTCOMMENT1" },
    { id: 2, postID: 1, body: "TESTCOMMENT2" },
    { id: 3, postID: 2, body: "TESTCOMMENT3" },
    { id: 4, postID: 2, body: "TESTCOMMENT4" },
    { id: 5, postID: 1, body: "TESTCOMMENT5" }
]

app.get("/comments/:postID", (req: Request, res: Response) => {
    const id: number = parseInt(req.params.postID, 10);
    let commArr: Comment[] = comments.filter(element => element.postID == id);
    console.log(commArr);
    res.send(commArr)
});

app.post("/comments", (req: Request, res: Response) => {
    console.log(req.body);
    const uid = Math.floor(Math.random() * 1000);
    const comment: Comment = { id: uid, postID: req.body.postID, body: req.body.body }
    comments.push(comment)
    res.sendStatus(201);
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
