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

productionFailRouter.use(function(req, res, next) {
    //res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

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

        const updatedProductObj = await productionController.updateProductionInspection(req, res);
        res.send(updatedProductObj);
    } catch(error) {
        console.log("error: " + error);
        res.status(404).json({error: error.message})
    }
})


//post-request to update database with visual inspection after personalization
productionFailRouter.post('/visualInspectionPersonalization/', async function(req, res) {
        //get ID to search for from request
        //const productID = parseInt(req.query["productID"]);

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

        console.log("http-request to update production table with visual inspection of products after Personlaization\n");

        //get information from request
        objVisualInspectionInfos = req.body;

        const updatedProductObj = await productionController.updatePersonalizationInspection(objVisualInspectionInfos);
        res.send(updatedProductObj);
    } catch(error) {
        console.log("error: " + error);
        res.status(404).json({error: error.message})
    }
})


//post-request to update database with visual inspection after Scanning
productionFailRouter.post('/visualInspectionScanning/', async function(req, res) {

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

    console.log("http-request to update production table with visual inspection of products after Scanning\n");

    const updatedProductObj = await productionController.updateScannerInspection(req);
    res.send(updatedProductObj);
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