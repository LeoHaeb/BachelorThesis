const Order = require('../Entities/Order');

//class for services to work with order-objects
class OrderService{
    
    //constructor for order class
    //each order class has connection to a database object orderdatabase
    constructor(){
    }

    //method to add new object order to order db
    async createNewOrder(customerObj, orderDatabase) {
        try {

            //create order object
            const newOrderObject = new Order(null, customerObj);
            
            //add new Order to db
            //get back id for new order
            const newOrderID =  await orderDatabase.createNewOrderEntity(newOrderObject);

            //set orderID in new Order Object
            newOrderObject.setOrderID(newOrderID.rows[0].order_id);

            console.log("Orderservice return for createNewOrder: " + newOrderObject);
            return newOrderObject;
        } catch(ex) {
            console.log("Problem in class Order-service in method addNewMaterial");
        }
    }
}

module.exports = OrderService;