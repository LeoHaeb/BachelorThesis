//class for orders

const orderRouter = require("../Routing/Routing-order");

//has only one attribute: customerID -> custoemr who has ordered 
class Order{
    constructor(productOrderID = null, customerObj, shopify_orderID, productSpec, boolPersonalization, amount) {
        this.productOrderID = productOrderID;
        this.customer = customerObj;
        this.shopify_orderID = shopify_orderID;
        this.productSpec = productSpec;
        this.boolPersonalization = boolPersonalization;
        this.amount = amount;
    }

    setProductOrderID(id) {
        this.productOrderID = id;
    }

    setCustomerObj(customerObject) {
        this.customer = customerObject;
    }
}

module.exports = Order;