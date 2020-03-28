const express = require('express');
const { exec, spawn } = require('child_process');
const router = express.Router();

router.get('/', (req, resp) => {
    resp.render('index');
});

router.post('/sendCommand', (req, resp) => {
    const { command } = req.body;

    console.log(command);
   /*  const args = command.split('-');
    console.log(args); */
    const output = spawn(command, [], { cwd: process.env.HOME, env: process.env });
    output.stdout.on("data", (data) => {
        console.log(data);
        resp.send(data);
    });
    output.stderr.on("stderr", (stderr) => {
        console.log(`stderr: ${stderr}`);
    });
    output.on("error", (error) => {
        console.log(`error: ${error.message}`);
    });
    output.on("close", close => {
        console.log(`child process exited with code ${close}`);
    });
});

module.exports = router;