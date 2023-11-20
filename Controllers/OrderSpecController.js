const { errors } = require("pg-promise");
const OrderSpecService = require("../Application/OrderSpec-service");

class OrderSpecController{
    //constructor
    constructor(orderSpecDatabase) {
        this.orderSpecDatabase = orderSpecDatabase;
    }


    //method to create new orderspec object for db
    async createNewOrderSpec(req, order) {

        //create new OrderSpecificationService-Object
        const orderSpecService = new OrderSpecService();

        //get all relevant information from Order request to create new order object
        //real body comes from shopify
        try {
            //list of orderspecifications from request body
            const orderSpecList = req.body.orders;          
            
            //invoke method to add list of new orderSpec
            const newOrderSpecList = await orderSpecService.createNewOrderSpec(order, orderSpecList, this.orderSpecDatabase);  
            console.log("OrderSpecController return for createNewOrderSpec: " + newOrderSpecList);
            return newOrderSpecList;        
        } catch (ex) {
            console.log("no orders in body");
        }
    }
}
module.exports = OrderSpecController;