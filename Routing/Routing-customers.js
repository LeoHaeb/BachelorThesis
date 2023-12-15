const express = require('express');
const CustomerController = require('../Controllers/CustomerController');
const CustomerDatabase = require('../DB/Customer-database');

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
        const fileNameArray = file.originalname.split(".");
        cb(null, `${Date.now()}.${fileNameArray[fileNameArray.length - 1]}`);
    },
  });

//initializing multer
const upload = multer({
        storage: storageEngine,
        //Limit for size of image to 1MB
        limits: { fileSize: 1000000 },
    });


//create Router-Object from Express-Middleware Router 
var customerRouter = express.Router();


//GET-request for getting customer
customerRouter.get('/getCustomerByID/:id', async function(req, res) {
    const id = req.params.id;

    try {
        //Database-Connection Object
        const dbConnection = new DBConnection();
        //database-object 
        const customerDatabase = new CustomerDatabase(dbConnection);
        //create material controller object with dependency injection of database
        const customerController = new CustomerController(customerDatabase);

        console.log("http-request to get customer with id = " +req.params.id  + " from DB\n");

        const customer = await customerController.getCustomerWithID(id);
        console.log("Customer with ID = " + id + ": " + customer);
        res.send(customer);
    } catch(error) {
        res.status(404).json({error: error.message})
    }
});


//POST-request for uploading an image
//response is the filename under which file is saved on backend + directory under which file is saved on backend
//resonse is sent as JSON
customerRouter.post('/uploadImage', upload.single('customerImage'), function (req, res) {
    console.log("Kunden-Image hochladen\n");

    console.log("filename: " + req.file.filename);
    console.log("directory: " + req.file.destination);

    //create respnse JSON
    resJson = {
        "filename": req.file.filename, 
        "directory": req.file.destination
    }
    //send response JSON
    res.send(resJson);
})


//POST-request for adding new customer to database
//response is ID of new custoemr in db_customer
//response is sent as JSON
customerRouter.post('/addNewCustomer/', async function(req, res) {

    //database conncection object
    const dbConnection = new DBConnection();
    //customer database object
    const customerDatabase = new CustomerDatabase(dbConnection);
    //create customer controller object 
    const customerController = new CustomerController(customerDatabase);

    console.log("http-request to add customer to DB\n");

    try {
        //add new costumer to database
        const addedCustomer = await customerController.addNewCUstomer(req);
        console.log("added Customer: " + JSON.stringify(addedCustomer));
        res.send(addedCustomer);
    } catch(error) {
        res.status(404).json({error: error.message})
    }
})

//GET-request to get to customer registration side
//load html-page for registrating customer
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
