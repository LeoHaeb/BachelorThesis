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

    try {
        //create database connectionObject
        const dbConnection = new DBConnection();

        //create Database Objects with Connection to PostgreSQL
        const productionDatabase = new ProductionDatabase(dbConnection);
        const materialDatabase = new MaterialDatabase(dbConnection);
        const orderDatabase = new OrderDatabase(dbConnection);
        const customerDatabase = new CustomerDatabase(dbConnection);

        //create controller objects
        const productionController = new ProductionController(productionDatabase, materialDatabase, orderDatabase, customerDatabase);

        console.log("http-request to update production table with failed products\n");

        const updatedProductIDs = await productionController.updateProductionFails(req, res);
        res.send(updatedProductIDs);
    } catch(error) {
        console.log("error: " + error);
        res.status(404).json({error: error.message})
    }
})


//post-request to update database with visual inspection after product passed manufacturing line
productionFailRouter.post('/visualInspectionManufacturing/', async function(req, res) {
    const info = req.body;

    try {
        //create database connectionObject
        const dbConnection = new DBConnection();

        //create Database Objects with Connection to PostgreSQL
        const productionDatabase = new ProductionDatabase(dbConnection);
        const materialDatabase = new MaterialDatabase(dbConnection);
        const orderDatabase = new OrderDatabase(dbConnection);
        const customerDatabase = new CustomerDatabase(dbConnection);

        //create controller objects
        const productionController = new ProductionController(productionDatabase, materialDatabase, orderDatabase, customerDatabase);

        console.log("http-request to update production table with visual inspection of products after manufacturing line\n");

        const updatedProductIDs = await productionController.updateProductionInspection(req, res);
        res.send(updatedProductIDs);
    } catch(error) {
        console.log("error: " + error);
        res.status(404).json({error: error.message})
    }
})


productionFailRouter.get('/', async function(req, res) {
    console.log(__dirname + "\..\public");
    console.log(path.join(__dirname, "..", "public"));
    res.sendFile(path.join(__dirname, "..", "public", "productionControlSite.html"));
})

module.exports = productionFailRouter;