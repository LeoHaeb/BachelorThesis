//importing modules
const express = require('express');
const path = require('path');
const matRouter = require('./Routing/Routing-material.js');
const customerRouter = require('./Routing/Routing-customers.js');
const orderRouter = require('./Routing/Routing-order.js');
const productionRouter = require('./Routing/Routing-production.js');
const productionFailRouter = require('./Routing/Routing-productionFails.js');
const scannerRouter = require('./Routing/Routing-scanner.js');
const bodyParser = require('body-parser')

//use Express framework 
const app = express();

//use body parser
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

//Routing for requests to production
app.use('/production/', productionRouter);
app.use('/production/', express.static(path.join(__dirname, "public")));

//Routing for requests to productionFails
app.use('/productionFails/', productionFailRouter);
app.use('/productionFails/', express.static(path.join(__dirname, "public")));

//Routing for requests to productionFails
app.use('/scanner/', scannerRouter);
//app.use('/scanner/', express.static(path.join(__dirname, "public")));