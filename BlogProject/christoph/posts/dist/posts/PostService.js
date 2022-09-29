"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const port = 8080;
var cors = require('cors');
app.use(cors());
const posts = [
    { id: 1, title: "TESTPOST1" },
    { id: 2, title: "TESTPOST2" }
];
app.get("/posts", (req, res) => {
    res.send(posts);
});
app.post("/posts", (req, res) => {
    console.log(req.body);
    const uid = Math.floor(Math.random() * 1000);
    const post = { id: uid, title: req.body.title };
    console.log(post);
    posts.push(post);
    res.sendStatus(201);
});
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
