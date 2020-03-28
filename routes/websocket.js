const express = require('express');
var socket = require('socket.io');
const router = express.Router();

router.get('/', (req, resp) => {
    const appServer = req.server;
    const io = socket(appServer);

    resp.render('websocket-client');

    io.on('connection', function (socket) {
        console.log("Made socket connection", socket.id);
        socket.on('command', function (event) {
            console.log(event);
        });
    });
});

module.exports = router;