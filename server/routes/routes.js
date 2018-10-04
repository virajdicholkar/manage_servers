/** imports */
var express = require('express');
var router = express.Router();

var serverMethods=require('./../database-controllers/server-methods')

/** routes def */
router
    .post('/createserver', serverMethods.createServer)
    .get('/startserver/:_id', serverMethods.startServer)
    .get('/stopserver/:_id', serverMethods.stopServer)
    .get('/getoneserver/:_id', serverMethods.getOneServer)
    .get('/allserver', serverMethods.getAllServers)
    .put('/addapi/:_id', serverMethods.addApi)

module.exports = router