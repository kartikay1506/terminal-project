const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.json({limit: '50mb', extended: true}),express.urlencoded({ limit: '1024mb', extended:true }));

//Start listening on the specified port
const PORT = process.env.PORT || 4000;
const appServer = app.listen(PORT, console.log(`Server started on port ${PORT}`));


//Routes
app.use(function(req, resp, next) {
    req.server = appServer;
    next();
});
app.use('/', require('./routes/websocket'));
app.use('/terminal', require('./routes/index'));

//Static Paths
var path = require('path');
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/assets'));