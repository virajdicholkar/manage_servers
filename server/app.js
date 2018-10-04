/** imports */
var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cors = require('cors');

var config=require('./config/config');
var router = require('./routes/routes');


/** variables */
var app = express()

/** Database connection */
mongoose.connect(config.mongo.url, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    db = database;
    console.log("database connected");
})

/** middlewares */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use('/',router);

/** server started listening */
app.listen(config.port);

