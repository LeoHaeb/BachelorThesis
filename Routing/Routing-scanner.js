const express = require('express');
const ProductionController = require('../Controllers/ProductionController');
const MaterialController = require('../Controllers/MaterialController');
const OrderController = require('../Controllers/OrderController');
const CustomerCOntroller = require('../Controllers/CustomerController');

//integrate module for connection to database
const DBConnection = require('../DataBaseConnection');
const ProductionDatabase = require('../DB/Production-database');
const MaterialDatabase = require('../DB/Material-database');
const OrderDatabase = require('../DB/Order-database');
const CustomerDatabase = require('../DB/Customer-database');
//integrate path module
const path = require('path');

//create routing-object from express middleware 
var scannerRouter = express.Router();

//POST-request when product is scanned
//response is ???
scannerRouter.get('/getSomeOrders/', async function(req, res) {

    //get amount of orders to send
    const amount = parseInt(req.query["amount"]);

    //create database connectionObject
    const dbConnection = new DBConnection();

    //create Database Objects with Connection to PostgreSQL
    const productionDatabase = new ProductionDatabase(dbConnection);
    const materialDatabase = new MaterialDatabase(dbConnection);
    const orderDatabase = new OrderDatabase(dbConnection);
    const customerDatabase = new CustomerDatabase(dbConnection);

    //create controller objects
    const productionController = new ProductionController(productionDatabase, materialDatabase, orderDatabase, customerDatabase);
    const materialController = new MaterialController(materialDatabase);
    const orderController = new OrderController(orderDatabase, customerDatabase);
    const customerController = new CustomerCOntroller(customerDatabase);

    console.log("http-request to start process of information assembly customer <-> production\n");

    //get list of first lines (amount) of order Objects from db
    const listOrderObj = await orderController.getSomeOrders(amount);

    try {
        console.log("die ersten " + amount + "orders: " + listOrderObj);
        res.send(listOrderObj);
    } catch(error) {
        res.status(404).json({error: error.message})
    }
})

//Method to show html interface for scanning
scannerRouter.get('/', async function(req, res) {
    console.log(__dirname + "\..\public");
    console.log(path.join(__dirname, "..", "public"));
    res.sendFile(path.join(__dirname, "..", "public", "Scanning.html"));
})

module.exports = scannerRouter;