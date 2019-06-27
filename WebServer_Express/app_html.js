var express = require("express");
var app = express();

// Requires EmbeddedJS
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    res.render("landing", {
        title: "NodeJS",
        items: [
            "express",
            "node",
            "javascript"
        ],
        desc: "<strong>I am a description</strong>",
        // EJS hides the quotes in the source code for safety
        desc_code: "<script type='text/javascript'>alert('Hello');</script>"
    });
});

app.get("/basic", function (req, res) {
    res.render("landing_basic.ejs");
});

app.listen(8080);
