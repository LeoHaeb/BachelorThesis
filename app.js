//importing modules
const express = require('express');
const path = require('path');
const postGreSQL = require('pg'); 
const matRouter = require('./Routing/routing-material');
const customerRouter = require('./Routing/routing-customers');
const orderRouter = require('./Routing/routing-order');
const bodyParser = require('body-parser')

//use Express framework 
const app = express();

app.use(bodyParser.json()); 

//create Server
const port = process.env.PORT || 8080;
app.listen(port);
console.log('Server started at http://localhost: ' + port);

//Routing for requests to material
app.use('/material/', matRouter);
console.log(path.join(__dirname, 'public'));
app.use('/material/', express.static(path.join(__dirname, "public")));
app.use('/material/changeMaterial', express.static(path.join(__dirname, "public")));

//Routing für request to customer
app.use('/customer/', customerRouter);
app.use('/customer/', express.static(path.join(__dirname, "public")));

//Routing for requests to orders
app.use('/order/', orderRouter);

