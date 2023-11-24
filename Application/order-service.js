const Order = require('../Entities/Order');

//class for services to work with order-objects
class OrderService{
    
    //constructor for order class
    //each order class has connection to a database object orderdatabase
    constructor(){
    }


    //method to get order from database for specific product_order_id = id
    async getOrderwithID(id, orderDatabase) {
        try {
            //get entry from database for id
            const order = await orderDatabase.getProductionOrderEntitywithID(id);
            const orderRow = order.rows[0];

            //create order Object with information from database
            const orderReturnObj = new Order(orderRow.product_order_id, orderRow.customer_id, orderRow.shopify_order_id, orderRow.prod_spec, orderRow.personaliz, orderRow.amount);

            console.log("OrderService return for getOrderwithID(id = " + id + "): " + orderReturnObj);
            //return order object
            return orderReturnObj;
        }
        catch(ex) {
            console.log("Problem in class Order-service in method getOrderwithID(" + id + ")");
        }
    }

    //method to add new object order to order db
    async createNewProductOrders(customer, listOrderItems, shopifyOrderID, boolPersonalization, orderDatabase) {
        try {

            //list to store all create order Objects
            var productOrderList = [];

            listOrderItems.forEach(orderItem => {
                //create new productOrder Object for each entry in items
                const newPorductOrderObj = new Order(null, customer, shopifyOrderID, orderItem.name, boolPersonalization, orderItem.quantity);

                //add new Object to list
                productOrderList.push(newPorductOrderObj)
            });
            
            //add new Order to db
            //get back id for new order
            //const newOrderID =  await orderDatabase.createNewOrderEntity(newOrderObject);

            //add all new productOrders to db
            const listOrderIDs =  await orderDatabase.addAllOrderEntities(productOrderList);

            //set IDs for each entry
            for (let i=0; i < listOrderIDs.length; i++) {
                productOrderList[i].setProductOrderID(listOrderIDs[i]);
            };

            console.log("Orderservice return object list for addAllOrderEntities: " + productOrderList);
            return productOrderList;
        } catch(ex) {
            console.log("Problem in class Order-service in method addNewMaterial");
        }
    }
}

module.exports = OrderService;