const OrderService = require("../Application/order-service");
const CustomerController = require("./CustomerController");

class OrderController{
    //constructor
    constructor(orderDatabase, customerDatabase) {
        this.orderDatabase = orderDatabase;
        this.customerDatabase = customerDatabase;
    }

    async createNewOrder(req) {

        //create new Order-Service-Object
        const orderService = new OrderService();

        //get all relevant information from Order request to create new order object
        //real body comes from shopify
        const custNr = req.body.custNr;

        //get customerObj from db with customerNr
        const customerController = new CustomerController(this.customerDatabase);
        const customer = await customerController.getCustomerWithID(custNr);

        //invoke method to add new order
        const newOrder = orderService.createNewOrder(customer, this.orderDatabase);

        console.log("OrderController return for createNewOrder: " + newOrder);
        return newOrder;
    }
}

module.exports = OrderController;