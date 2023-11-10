const express = require('express');
const OrderController = require('../Controllers/OrderController');
const DBConnection = require('../DataBaseConnection');
const OrderDatabase = require('../DB/order-database');
const CustomerDatabase = require('../DB/customer-database');

var orderRouter = express.Router();

orderRouter.post('/addNewOrder', async function(req, res) {
    
    try {
        //create new database Objects 
        dBConnection = new DBConnection();
        const orderDatabase = new OrderDatabase(dBConnection);
        const customerDatabase = new CustomerDatabase(dBConnection);

        //create OrderController Object
        const orderController = new OrderController(orderDatabase, customerDatabase);

        console.log("http-request to create new order\n");

        //invoke method from Controller layer to add new material
        const order = orderController.createNewOrder(req);
        console.log("order with orderID = " + order.orderID + " and customerID" + order.customer.customerNr);

        res.send(order);
    } catch(ex) {

    }

});

module.exports = orderRouter;