const OrderService = require("../Application/Order-service");
const CustomerController = require("./CustomerController");

class OrderController{
    //constructor
    constructor(orderDatabase, customerDatabase) {
        this.orderDatabase = orderDatabase;
        this.customerDatabase = customerDatabase;
    }


    //method to get order object with orderID as id
    async getProductOrderWithID(id) {
        //create OrderService Object
        const orderService = new OrderService()

        //invoke method from Use Case Layer to work with order object, dependency injection with product_ordering database
        const order = await orderService.getOrderwithID(id, this.orderDatabase);

        //get Customer with customer_id from order Object
        const customerController = new CustomerController(this.customerDatabase);
        const customer = await customerController.getCustomerWithID(order.customer);
        //set customer attribute from order object
        order.setCustomerObj(customer);

        console.log("Ordercontroller return for getOrderWithID: " + order);
        //return Material object
        return order;
    }


    //method to add new order to db 
    async createNewProductOrders(singleOrder) {

        //create new Order-Service-Object
        const orderService = new OrderService();

        //create Custoemr Controller Object
        const customerController = new CustomerController(this.customerDatabase);


        //get customer Object and customerNr from order
        //const reqCustomer = singleOrder.customer;
        if (singleOrder.customer && singleOrder.customer.id) {
            const custNr = singleOrder.customer.id;

            //get customerObj from db with customerNr
            var customer = await customerController.getCustomerWithID(custNr);    

            if (!(customer)){
                console.log("customer with id = " + custNr + " not yet available, create new customer ");
                var customer = await customerController.addNewCUstomer(singleOrder);           
            }

        } else {
            // if no custoemr in req at all   
            console.log("no customer reference in request, create new customer");
            var customer = await customerController.addNewDefaultCustomer(singleOrder);           
        }

        
        //gather all information from singleOrder to pass to next layer
        const listOrderItems = singleOrder.line_items;
        const shopifyOrderID = singleOrder.id;
        const boolPersonalization = true;

        //invoke method to add new order
        const listNewOrders = await orderService.createNewProductOrders(customer, listOrderItems, shopifyOrderID, boolPersonalization, this.orderDatabase);

        console.log("OrderController returns for createNewOrder: " + listNewOrders);
        
        return listNewOrders;
    }
}

module.exports = OrderController;