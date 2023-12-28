//class for orders

const orderRouter = require("../Routing/Routing-order");

//has only one attribute: customerID -> custoemr who has ordered 
class Order{
    constructor(productOrderID = null, customerObj, shopify_orderID, productSpec, boolPersonalization, amount, orderDate, processed=0) {
        this.productOrderID = productOrderID;
        this.customer = customerObj;
        this.shopify_orderID = shopify_orderID;
        this.productSpec = productSpec;
        this.boolPersonalization = boolPersonalization;
        this.amount = amount;
        this.orderDate = orderDate;
        this.processed = processed;
    }

    setProductOrderID(id) {
        this.productOrderID = id;
    }

    setCustomerObj(customerObject) {
        this.customer = customerObject;
    }

    updateValueProcessed(value) {
        this.processed += value;
    }
}

module.exports = Order;