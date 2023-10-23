//importing modules
const express = require('express');
const path = require('path');
const postGreSQL = require('pg'); 
const matRouter = require('./Routing/routing-material');
const customerRouter = require('./Routing/routing-customers');
const bodyParser = require('body-parser')

//Express framework einbinden
const app = express();

app.use(bodyParser.json()); 

//Server einrochten
const port = process.env.PORT || 8080;
app.listen(port);
console.log('Server started at http://localhost: ' + port);

//Routing für Anfragen an Material einbinden
app.use('/material/', matRouter);
console.log(path.join(__dirname, 'public'));
app.use('/material/', express.static(path.join(__dirname, "public")));

//Routing für Anfragen an Kunde einbinden
app.use('/kunden/', customerRouter)
app.use('/kunden/', express.static(path.join(__dirname, "public")));
