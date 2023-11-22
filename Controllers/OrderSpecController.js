const { errors } = require("pg-promise");
const OrderSpecService = require("../Application/OrderSpec-service");

class OrderSpecController{
    //constructor
    constructor(orderSpecDatabase) {
        this.orderSpecDatabase = orderSpecDatabase;
    }


    //method to create new orderspec object for db
    async createNewOrderSpec(reqBodyOrder, refOrderObj) {

        //create new OrderSpecificationService-Object
        const orderSpecService = new OrderSpecService();

        //get list of ordered items from request
        const listOrderItems = reqBodyOrder.line_items;

        try {
            
            //invoke method to add list of new orderSpec
            const newOrderSpecList = await orderSpecService.createNewOrderSpec(listOrderItems, refOrderObj, this.orderSpecDatabase);  
            console.log("OrderSpecController return for createNewOrderSpec: " + newOrderSpecList);
            return newOrderSpecList;        
        } catch (ex) {
            console.log("no orders in body");
        }
    }
}
module.exports = OrderSpecController;