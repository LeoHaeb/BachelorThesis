const { errors } = require("pg-promise");
const OrderSpecService = require("../Application/orderSpec-service");

class OrderSpecController{
    //constructor
    constructor(orderSpecDatabase) {
        this.orderSpecDatabase = orderSpecDatabase;
    }

    async createNewOrderSpec(req, order) {

        //create new OrderSpecificationService-Object
        const orderSpecService = new OrderSpecService();

        //get all relevant information from Order request to create new order object
        //real body comes from shopify
        try {
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