const express = require('express');
const materialController = require('../Controllers/MaterialController');
const OrderController = require('../Controllers/OrderController');
const OrderSpecController = require('../Controllers/OrderSpecController');
const ProductionController = require('../Controllers/ProductionController');

const DBConnection = require('../DataBaseConnection');

const ProductionDatabase = require('../DB/production-database');
const CustomerDatabase = require('../DB/customer-database');
const orderSpecDatabase = require('../DB/orderSpec-database');
const MaterialDatabase = require('../DB/material-database');

const path = require('path');

var productionRouter = express.Router();


productionRouter.post('/addNewProductsToProduction/', async function(req, res) {
    //create database connectionObject
    const dbConnection = new DBConnection();

    //create Database Objects with Connection to PostgreSQL
    const productionDatabase = new ProductionDatabase(dbConnection);
    const materialDatabase = new MaterialDatabase(dbConnection);

    //create controller object
    const productionController = new ProductionController(productionDatabase, materialDatabase);

    console.log("http-request to add new product for manufacturing\n");

    try {
        const addedProducts = await productionController.addNewProducts(req, res);
    } catch (ex) {
        res.status(404).json({error: error.message})
    }
})


productionRouter.get('/', async function(req, res) {
    console.log(__dirname + "\..\public");
    console.log(path.join(__dirname, "..", "public"));
    res.sendFile(path.join(__dirname, "..", "public", "ProductionOrder.html"));
})

module.exports = productionRouter;