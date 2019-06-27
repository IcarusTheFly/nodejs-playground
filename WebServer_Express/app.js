var express = require("express");
var app = express();

app.use("/middleware", function (req, res, next) {
    console.log(req.url);
    res.send("/middleware was called");

    setTimeout(function () {
        next();
    }, 5000);
});

app.get("/middleware/123", function (req, res) {
    console.log(req.url);
});

app.get("/", function (req, res) {
    res.end("Hello again, world");
});

app.get("/start", function (req, res) {
    res.send("This is the start site");
});

app.listen(8080);
