import Post from "../interfaces/Post";
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

const app: Express = express()
app.use(bodyParser.json())
const port = 8080;
var cors = require('cors')
app.use(cors())

const posts: Post[] = [
  { id: 1, title: "TESTPOST1" },
  { id: 2, title: "TESTPOST2" }
]

app.get("/posts", (req: Request, res: Response) => {
  res.send(posts)
});

app.post("/posts", (req: Request, res: Response) => {

  console.log(req.body);

  const uid = Math.floor(Math.random() * 1000);
  const post: Post = { id: uid, title: req.body.title }
  console.log(post);
  posts.push(post)
  res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
