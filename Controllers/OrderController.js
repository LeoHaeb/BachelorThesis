const OrderService = require("../Application/Order-service");
const CustomerController = require("./CustomerController");

class OrderController{
    //constructor
    constructor(orderDatabase, customerDatabase) {
        this.orderDatabase = orderDatabase;
        this.customerDatabase = customerDatabase;
    }


    //method to add new order to db 
    async createNewOrder(singleOrder) {

        //create new Order-Service-Object
        const orderService = new OrderService();

        //get customer and customerNr from order
        const reqCustomer = singleOrder.customer;
        const custNr = reqCustomer.id;


        //get customerObj from db with customerNr
        const customerController = new CustomerController(this.customerDatabase);
        var customer = await customerController.getCustomerWithID(custNr);

        //check whether customer already in db
        if (!(customer)) {
            console.log("customer not yet available, create new customer ");

            var customer = await customerController.addNewCUstomer(reqCustomer);
        }
        

        //invoke method to add new order
        const newOrder = await orderService.createNewOrder(singleOrder, customer, this.orderDatabase);

        console.log("OrderController returns for createNewOrder: " + newOrder);
        
        return newOrder;
    }
}

module.exports = OrderController;