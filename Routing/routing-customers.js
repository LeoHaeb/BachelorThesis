const express = require('express');
const CustomerService = require('../Application/customer-service');
const CustomerDatabase = require('../Gateways/customer-database');
const Customer = require('../Entities/customer');
//integrate module for connection to database
const DBConnection = require('../DataBaseConnection');
const path = require('path');
//integrate multer module for uploading files to backend
const multer = require('multer');

//Setting storage engine (from "https://www.makeuseof.com/upload-image-in-nodejs-using-multer/" )
const storageEngine = multer.diskStorage({
    destination: "./images",
    //specifiy filename to store uploaded files
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}--${file.originalname}`);
    },
  });

//initializing multer
const upload = multer({
        storage: storageEngine,
        //Limit for size of image to 1MB
        limits: { fileSize: 1000000 },
    });
//const upload = multer({ dest: 'uploads/' })


//Erzeugen Router-Objekt aus Express-Middleware Router 
var customerRouter = express.Router();



customerRouter.post('/uploadImage', upload.single('customerImage'), function (req, res) {
    console.log("Kunden-Image hochladen\n");

    console.log("filename: " + req.file.filename);
    console.log("directory: " + req.file.destination);

    resJson = {
        "filename": req.file.filename, 
        "directory": req.file.destination
    }

    res.send(resJson);
})


//POST-request for adding new customer to database
customerRouter.post('/addNewCustomer/', async function(req, res) {

    const dbConnection = new DBConnection();
    //database object
    const customerDatabase = new CustomerDatabase(dbConnection );
    //customer-service-object
    const customerService = new CustomerService(customerDatabase);

    console.log("add new customer to DB\n");
    console.log(req.body);

    const reqBody = req.body;

    try {
        //create new customer-object
        const customer = new Customer(null, reqBody.customerName, reqBody.custAdrNr, reqBody.custAdrStreet, reqBody.custAdrPlz, reqBody.persImage, reqBody.custMailAdr, reqBody.custPassword);
        //add new costumer to database
        const addedCustomer = await customerService.addNewCustomerDB(customer);
        console.log("added Customer: " + JSON.stringify(addedCustomer.rows));
        res.json(addedCustomer);
    } catch(error) {
        res.status(404).json({error: error.message})
    }
})


customerRouter.get('/', async function(req, res) {
    console.log(__dirname + "\..\public");
    console.log(path.join(__dirname, "..", "public"));
    res.sendFile(path.join(__dirname, "..", "public", "RegistrierungKunde.html"));
})

//load html page for adding customer to database
customerRouter.get('/', async function(req, res) {
    console.log(__dirname + "\..\public");
    console.log(path.join(__dirname, "..", "public"));
    res.sendFile(path.join(__dirname, "..", "public", "RegistrierungKunde.html"));
})


module.exports = customerRouter;