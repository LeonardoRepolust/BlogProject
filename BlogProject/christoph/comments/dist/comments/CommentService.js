"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
var cors = require('cors');
app.use(cors());
var port = 8081;
var comments = [
    { id: 1, postID: 2, body: "TESTCOMMENT1" },
    { id: 2, postID: 1, body: "TESTCOMMENT2" },
    { id: 3, postID: 2, body: "TESTCOMMENT3" },
    { id: 4, postID: 2, body: "TESTCOMMENT4" },
    { id: 5, postID: 1, body: "TESTCOMMENT5" }
];
app.get("/comments/:postID", function (req, res) {
    var id = parseInt(req.params.postID, 10);
    var commArr = comments.filter(function (element) { return element.postID == id; });
    console.log(commArr);
    res.send(commArr);
});
app.post("/comments", function (req, res) {
    console.log(req.body);
    var uid = Math.floor(Math.random() * 1000);
    var comment = { id: uid, postID: req.body.postID, body: req.body.body };
    comments.push(comment);
    res.sendStatus(201);
});
app.listen(port, function () {
    console.log("Listening on ".concat(port));
});
