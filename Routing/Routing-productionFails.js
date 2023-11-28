const express = require('express');
const ProductionController = require('../Controllers/ProductionController');
const MaterialController = require('../Controllers/MaterialController');
const OrderController = require('../Controllers/OrderController');
//integrate module for connection to database
const DBConnection = require('../DataBaseConnection');
const ProductionDatabase = require('../DB/Production-database');
const MaterialDatabase = require('../DB/Material-database');
const OrderDatabase = require('../DB/Order-database');
const CustomerDatabase = require('../DB/Customer-database');

//create routing-object from express middleware 
var productionFailRouter = express.Router();

//integrate path module
const path = require('path');

//post-request to update database with failed production cases
productionFailRouter.post('/updateFailedProducts/', async function(req, res) {
    const info = req.body;
})


productionFailRouter.get('/', async function(req, res) {
    console.log(__dirname + "\..\public");
    console.log(path.join(__dirname, "..", "public"));
    res.sendFile(path.join(__dirname, "..", "public", "productionControlSite.html"));
})

module.exports = productionFailRouter;