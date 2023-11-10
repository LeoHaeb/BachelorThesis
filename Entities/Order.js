//class for orders

const orderRouter = require("../Routing/routing-order");

//has only one attribute: customerID -> custoemr who has ordered 
class Order{
    constructor(orderID = null, customerObj) {
        this.orderID = orderID;
        this.customer = customerObj;
    }

    setOrderID(id) {
        this.orderID = id;
    }

}

module.exports = Order;