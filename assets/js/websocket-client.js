$(document).ready(function () {
    //Creating a web socket
    var socketClient = io.connect('http://localhost:4000');

    //Creating and opening a terminal
    var term = new Terminal({
        cursorBlink: true,
        cursorStyle: 'block',
    });
    term.open(document.getElementById('terminal'));
    term.write('\x1B[1;3;31mroot@localhost\x1B[0m $  ');

    var data = "";
    var cmndHistory = new Array();
    term.onKey(key => {
        var char = key;
        var event = key.domEvent;
        if (event.code == "Enter") {
            cmndHistory.push(data);
            socketClient.emit("command", {
                command: data
            });
            data = "";
            term.write('\r\n\x1B[1;3;31mroot@localhost\x1B[0m $  ');
        }
        else if (event.code == "Backspace") {
            data = data.slice(0, data.length - 1);
            term.write('\b \b');
        }
        else {
            data = data + char.key;
            term.write(char.key);
        }
    });

    function showHistory() {
        console.log(cmndHistory);
    }
});