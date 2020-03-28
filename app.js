const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.json({limit: '50mb', extended: true}),express.urlencoded({ limit: '1024mb', extended:true }));

//Session
/* app.use(session({
    secret: "Docker Project",
    saveUninitialized: true,
    resave: true
})); */

//Database Config
//const db = require('./config/keys').MongoURI;

//Connect to MongoDB
/* mongoose.connect(db, { useNewUrlParser : true, useUnifiedTopology: true })
.then(console.log('MongoDB connected'))
.catch(err => console.log(err)); */

//Routes
app.use('/', require('./routes/index'));

//Static Paths
var path = require('path');
app.use(express.static(__dirname + '/node_modules'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
