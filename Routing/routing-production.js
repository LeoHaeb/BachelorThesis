const express = require('express');
const ProductionController = require('../Controllers/ProductionController');
//integrate module for connection to database
const DBConnection = require('../DataBaseConnection');
const ProductionDatabase = require('../DB/Production-database');
const MaterialDatabase = require('../DB/Material-database');

//for qr-code creation
const QRCode = require('qrcode');

//integrate path module
const path = require('path');

//create routing-object from express middleware 
var productionRouter = express.Router();


//post-request to add new products
productionRouter.post('/addNewProductsToProduction/', async function(req, res) {
    try {
        //create database connectionObject
        const dbConnection = new DBConnection();

        //create Database Objects with Connection to PostgreSQL
        const productionDatabase = new ProductionDatabase(dbConnection);
        const materialDatabase = new MaterialDatabase(dbConnection);

        //create controller object
        const productionController = new ProductionController(productionDatabase, materialDatabase);

        console.log("http-request to add new product for manufacturing\n");

        const addedProducts = await productionController.addNewProducts(req, res);
        console.log("added products: " + addedProducts);

        //create QR code example to www.google.de
        QRCode.toFile("qrCodeExample.jpg", "www.google.de" + addedProducts[0].indizes[0], { errorCorrectionLevel: 'H' });

        res.send(addedProducts);
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