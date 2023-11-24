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

//for qr-code creation
const QRCode = require('qrcode');

//integrate path module
const path = require('path');
const { appendFile } = require('fs');
const CustomerCOntroller = require('../Controllers/CustomerController');

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
        const orderDatabase = new OrderDatabase(dbConnection);
        const customerDatabase = new CustomerDatabase(dbConnection);

        //create controller objects
        const productionController = new ProductionController(productionDatabase, materialDatabase, orderDatabase, customerDatabase);
        const materialController = new MaterialController(materialDatabase);
        const orderController = new OrderController(orderDatabase);
        const customerController = new CustomerCOntroller(customerDatabase);

        console.log("http-request to add new product for manufacturing\n");

        const addedProducts = await productionController.addNewProducts(req, res);
        console.log("added products: " + addedProducts);

        //create QR code example to www.google.de
        //QRCode.toString("qrCodeExample.png", "www.google.de" + addedProducts[0].indizes[0], { version: 2, type: 'png', renderOpts.deflateLevel: 9 });
        //max möglicher string mit version: 2 -> QRCode.toFile("qrCodeExample.png", "www.google.de123456789011111111111111111111111111111111", {type: 'png', scale: 0.5, mode: "alphanumeric", version: 2, deflateLevel: 20, errorCorrectionLevel: 'L'});

        //loop over each index
        for (let i = 0; i < addedProducts.length; i++) {
            for (let j = 0; j < addedProducts[i].indizes.length; j++) {
                //define name for qrCode image
                var nameQrCode = addedProducts[i].indizes[j].toString().padStart(5, '0');

                //information for customer to pass to QR-Code
                const infoProductObj = await productionController.getProductWithID(addedProducts[i].indizes[j]);
                const infoMaterialNr = infoProductObj.material.matNr;

                //create QR-Code
                QRCode.toFile("./QRCodes/" + nameQrCode + ".png", "www.BspServer.de/" + parseInt(infoMaterialNr), {type: 'png', width: 100, mode: "alphanumeric", deflateLevel: 20, errorCorrectionLevel: 'L'});
            }
        }

        res.send(addedProducts);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})


productionRouter.get('/', async function(req, res) {
    console.log(__dirname + "\..\public");
    console.log(path.join(__dirname, "..", "public"));
    res.sendFile(path.join(__dirname, "..", "public", "ProductionOrder.html"));
})

module.exports = productionRouter;