const express = require('express');
const router = express.Router();
var os = require('os');
var pty = require('node-pty');
var shell = os.platform() === 'win32' ? "C:/Windows/system32/WindowsPowerShell/v1.0/powershell.exe" : 'bash';

router.get('/', (req, resp) => {
    resp.render('index');
});

router.post('/data', (req, resp) => {
    const { command } = req.body;
    console.log(command);
    var ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env
    });

    ptyProcess.on("data", function(data) {
        process.stdout.write(data);
    });

    var output = process.stdin.read(ptyProcess.write(command + '\r'));
    console.log(output);
    //ptyProcess.resize(100, 40);
    //ptyProcess.write('ls\r');
});

module.exports = router;