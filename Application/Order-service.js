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
        catch(error) {
            console.log("Problem in class Order-service in method getOrderwithID(" + id + ")");
            console.log("error: " + error)
        }
    }


    //method to get order from database for specific product_order_id = id
    async updateOrderProcessed(orderObj, value, orderDatabase) {
        try {
            //update order db
            const orderID = await orderDatabase.updateOrderEntityProcessed(orderObj, value);
            orderObj.updateValueProcessed(value);
        }
        catch(error) {
            console.log("Problem in class Order-service in method updateOrderProcessed");
            console.log("error: " + error)
        }
    }


    //Method to get first open order for Shopify ID
    async getFirstOpenOrderWithShopifyID(shopify_order_id, orderDatabase) {
        try {
            //get entry from database for shopify id
            const order = await orderDatabase.getFirstOpenOrderEntityWithShopifyID(shopify_order_id);
            const orderRow = order.rows[0];

            //create order Object with information from database
            const orderReturnObj = new Order(orderRow.product_order_id, orderRow.customer_id, orderRow.shopify_order_id, orderRow.prod_spec, orderRow.personaliz, orderRow.amount, orderRow.processed);

            console.log("OrderService return for getFirstOpenOrderWithShopifyID(shopify_order_id = " + shopify_order_id + "): " + orderReturnObj);
            //return order object
            return orderReturnObj;
        }
        catch(ex) {
            console.log("Problem in class Order-service in method getFirstOpenOrderWithShopifyID(" + shopify_order_id + ")");
        }
    }


    //method to get several orders fomr db
    async getSomeOrders(amount, orderDatabase) {
        try {
            //return list of Order Objects
            const orderObjReturnList = [];

            //get entry from database for id
            const orderList = await orderDatabase.getProductionOrderEntities(amount);

            for (let i = 0; i < orderList.rows.length; i++) {
                const orderRow = orderList.rows[i];
                //create order Object with information from database
                const orderObj = new Order(orderRow.product_order_id, orderRow.customer_id, orderRow.shopify_order_id, orderRow.prod_spec, orderRow.personaliz, orderRow.amount, orderRow.orderdate, orderRow.processed);
                orderObjReturnList.push(orderObj)
            }

            console.log("OrderService return for getSomeOrders: " + orderObjReturnList);
            //return order object
            return orderObjReturnList;
        }
        catch(error) {
            console.log("Problem in class Order-service in method getSomeOrders");
            console.log("error: " + error)
        }
    }


    //method to next orders from db to process
    async getNextOpenOrders(index, orderDatabase) {
        try {
            //return list of Order Objects
            const orderObjReturnList = [];

            //get entry from database for id
            const orderList = await orderDatabase.getNextOpenOrderEntities(index);

            for (let i = 0; i < orderList.rows.length; i++) {
                const orderRow = orderList.rows[i];
                //create order Object with information from database
                const orderObj = new Order(orderRow.product_order_id, orderRow.customer_id, orderRow.shopify_order_id, orderRow.prod_spec, orderRow.personaliz, orderRow.amount, orderRow.orderdate, orderRow.processed);
                orderObjReturnList.push(orderObj)
            }

            console.log("OrderService return for getNextOpenOrders: " + orderObjReturnList);
            //return order object
            return orderObjReturnList;
        }
        catch(error) {
            console.log("Problem in class Order-service in method getNextOpenOrders");
            console.log("error: " + error)
        }
    }


    //method to get all orders from database for shopify_order_id = id
    async getOpenOrdersFromShopifyOrderID(shopify_order_id, orderDatabase) {
        try {

            //return list of Order Objects
            const orderObjReturnList = [];

            //get entries from database for id
            const orderList = await orderDatabase.getOpenProductionOrderEntitiesFromShopifyID(shopify_order_id);

            for (let i = 0; i < orderList.rows.length; i++) {
                const orderRow = orderList.rows[i];
                //create order Object with information from database
                const orderObj = new Order(orderRow.product_order_id, orderRow.customer_id, orderRow.shopify_order_id, orderRow.prod_spec, orderRow.personaliz, parseInt(orderRow.amount), orderRow.orderdate, parseInt(orderRow.processed));
                orderObjReturnList.push(orderObj)
            }

            console.log("OrderService return for getOpenOrdersFromShopifyOrderID(shopify_order_id = " + shopify_order_id + "): " + orderObjReturnList);
            //return order object
            return orderObjReturnList;
        }
        catch(ex) {
            console.log("Problem in class Order-service in method getOpenOrdersFromShopifyOrderID(" + shopify_order_id + ")");
        }
    }


    //method to add new object order to order db
    async createNewProductOrders(customer, listOrderItems, shopifyOrderID, boolPersonalization, orderDate, orderDatabase) {
        try {

            //list to store all created order Objects
            var productOrderList = [];

            listOrderItems.forEach(orderItem => {
                //create new productOrder Object for each entry in items
                const newPorductOrderObj = new Order(null, customer, shopifyOrderID, orderItem.name, boolPersonalization, orderItem.quantity, orderDate);

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
