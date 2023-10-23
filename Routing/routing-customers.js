const express = require('express');
const CustomerService = require('../Application/customer-service');
const CustomerDatabase = require('../Gateways/customer-database');
//Einbinden Modul zur Verbindung mit Datenbank
const dbConnection = require('../DataBaseConnection');
const path = require('path');

//Erzeugen Router-Objekt aus Express-Middleware Router 
var customerRouter = express.Router();


customerRouter.post('/kundeRegistrieren', async function(req, res) {
    console.log("neuen Kunden anlegen\n");
    
    //Object for Database
    const customerDatabase = new CustomerDatabase(dbConnection);
    const customerService = new CustomerService(customerDatabase); 
    
    customerService

})

customerRouter.get('/', async function(req, res) {
    console.log(__dirname + "\..\public");
    console.log(path.join(__dirname, "..", "public"));
    res.sendFile(path.join(__dirname, "..", "public", "RegistrierungKunde.html"));
})

module.exports = customerRouter;