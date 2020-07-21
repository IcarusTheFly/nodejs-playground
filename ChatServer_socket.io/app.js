var express = require("express");

var app = express();

var server = require("http").Server(app);
var io = require("socket.io")(server);

app.use("/public", express.static("public"));

io.on("connection", function (socket) {
    console.log("The user is connected");

    socket.on("message", function (message) {
        console.log(message);
        // Send the message to other servers
        socket.broadcast.emit("newMessage", message);
    });

    socket.on("welcomeServer", function (message) {
        console.log("Welcome to the server", message.name)
    });

    setInterval(function () {
        socket.emit("welcome", {
            date: Date.now()
        });
    }, 5000);
});

server.listen(8080);
