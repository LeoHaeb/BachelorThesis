const express = require('express');
const OrderController = require('../Controllers/OrderController');

const DBConnection = require('../DataBaseConnection');
const OrderDatabase = require('../DB/Order-database');
const CustomerDatabase = require('../DB/Customer-database');

var orderRouter = express.Router();


//POST-request for adding new order to order db and product_ordering db
orderRouter.post('/addNewOrder', async function(req, res) {
    
    try {
        //create new database Objects for order-db and customer-db
        const dBConnection = new DBConnection();
        const orderDatabase = new OrderDatabase(dBConnection);
        const customerDatabase = new CustomerDatabase(dBConnection);

        //create OrderController Object
        const orderController = new OrderController(orderDatabase, customerDatabase);

        console.log("http-request to create new order\n");

        //check if only 1 order or more
        //create list of orders
        if (req.body.order) {
            var reqBodyOrderList = [req.body.order]
        } else if (req.body.orders) {
            var reqBodyOrderList = req.body.orders
        } else {
            console.log("request has no orders")
        }

        //list of order Objects for return 
        const returnListOrders = []

        //go through list of orders
        for (let i = 0; i < reqBodyOrderList.length; i++) {
            //invoke method from Controller layer to add new order
            const listAddedOrders = await orderController.createNewProductOrders(reqBodyOrderList[i]);
            
            console.log("added all orders:\n " + listAddedOrders);

            // add orders to return list
            listAddedOrders.forEach(order => {
                returnListOrders.push(order)
            });
        }

        res.send(returnListOrders);
    } catch(error) {
        console.log(error.message);
        res.status(404).json({error: error.message})
    }
});

module.exports = orderRouter;
