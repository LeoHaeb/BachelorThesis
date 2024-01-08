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

//GET request to get next open orders
scannerRouter.get('/getNextOpenOrders/', async function(req, res) {

    //get amount of orders to send
    const index = parseInt(req.query["index"]);

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
    const listOrderObj = await orderController.getNextOpenOrders(index);

    try {
        console.log("next orders: " + listOrderObj);
        //allow cross origin ressource sharing CORS for testing with local frontend
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.send(listOrderObj);
    } catch(error) {
        res.status(404).json({error: error.message})
    }
})


//GET Request to get all information to certain order_id
scannerRouter.get('/getOpenOrdersFromShopifyOrderID/', async function(req, res) {

    //get shopify order ID 
    const shopify_order_id = parseInt(req.query["shopify_order_id"]);

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

    //get list of information to order with shopify_order_id from db
    const listOrderObj = await orderController.getOpenOrdersFromShopifyOrderID(shopify_order_id);

    try {
        console.log("next orders: " + listOrderObj);
        //allow cross origin ressource sharing CORS for testing with local frontend
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.send(listOrderObj);
    } catch(error) {
        res.status(404).json({error: error.message})
    }
})


//GET request for bringing together db_production and db_order
scannerRouter.post('/assignOrderToProduct/', async function(req, res) {

    //get inforamtion from POST Request
    const assembleInfos = req.body;

    //create database connectionObject
    const dbConnection = new DBConnection();

    //create Database Objects with Connection to PostgreSQL
    const productionDatabase = new ProductionDatabase(dbConnection);
    const materialDatabase = new MaterialDatabase(dbConnection);
    const orderDatabase = new OrderDatabase(dbConnection);
    const customerDatabase = new CustomerDatabase(dbConnection);

    //create controller objects
    const productionController = new ProductionController(productionDatabase, materialDatabase, orderDatabase, customerDatabase);

    try {
        //invoke method from production Controller
        const productReturnObject = await productionController.bringTogetherPrductAndOrder(assembleInfos);

        console.log("product Object after merge with order Object: " + productReturnObject);
        //allow cross origin ressource sharing CORS for testing with local frontend
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.send(productReturnObject);
    } catch(error) {
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        //res.send(error);
        res.status(404).json({error: error.message})
    }
}) 


//post-request to update database with newest shipping Status 
scannerRouter.post('/shippingStatus/', async function(req, res) {
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

        console.log("http-request to update production table with shipping status of product\n");

        const updatedProductObj = await productionController.updateShippingStatus(req);
        res.send(updatedProductObj);
    } catch(error) {
        console.log("error: " + error);
        res.status(404).json({error: error.message})
    }
})


//get-request to get all open shippings for products with certain shopify_order_ID 
scannerRouter.get('/getAllOpenShippingForOrder/', async function(req, res) {
    try {
        //get shopify order ID to look for open shippings
        const shopify_order_id = parseInt(req.query["shopify_order_id"]);

        //create database connectionObject
        const dbConnection = new DBConnection();

        //create Database Objects with Connection to PostgreSQL
        const productionDatabase = new ProductionDatabase(dbConnection);
        const materialDatabase = new MaterialDatabase(dbConnection);
        const orderDatabase = new OrderDatabase(dbConnection);
        const customerDatabase = new CustomerDatabase(dbConnection);

        //create controller objects
        const productionController = new ProductionController(productionDatabase, materialDatabase, orderDatabase, customerDatabase);

        const listProductObj = await productionController.getOpenShippingProducts(shopify_order_id);
        res.send(listProductObj);
    } catch(error) {
        console.log("error: " + error);
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