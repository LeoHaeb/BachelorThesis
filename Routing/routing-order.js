const express = require('express');
const OrderController = require('../Controllers/OrderController');
const OrderSpecController = require('../Controllers/OrderSpecController');

const DBConnection = require('../DataBaseConnection');
const OrderDatabase = require('../DB/Order-database');
const CustomerDatabase = require('../DB/Customer-database');
const orderSpecDatabase = require('../DB/OrderSpec-database');

var orderRouter = express.Router();


//POST-request for adding new order to order db and orderspec db
orderRouter.post('/addNewOrder', async function(req, res) {
    
    try {
        //create new database Objects for order-db and customer-db
        const dBConnection = new DBConnection();
        const orderDatabase = new OrderDatabase(dBConnection);
        const customerDatabase = new CustomerDatabase(dBConnection);

        //create OrderController Object
        const orderController = new OrderController(orderDatabase, customerDatabase);

        console.log("http-request to create new order\n");

        //invoke method from Controller layer to add new order
        const order = await orderController.createNewOrder(req);
        console.log("order with orderID = " + order.orderID + " and customerID: " + order.customer.customerNr);

        //invoke method from Controller layer to add new orderSpecification
        const ordereSpecDatabase = new orderSpecDatabase(dBConnection);

        const orderSpecController = new OrderSpecController(ordereSpecDatabase);
        const orderSpecificationResult = await orderSpecController.createNewOrderSpec(req, order);

        console.log("added new orderspecification for order");

        res.send(order);
    } catch(ex) {
        res.status(404).json({error: error.message})
    }
});

module.exports = orderRouter;