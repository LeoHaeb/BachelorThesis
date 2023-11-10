const OrderSpec = require('../Entities/OrderSpecification');

//class for services to work with order-objects
class OrderSpecService{
    
    //constructor for orderSpecification class
    //each order class has connection to a database object orderdatabase
    constructor(){
    }

    //method to add new object order to db_order
    async createNewOrderSpec(order, orderSpecList, orderSpecDatabase) {

        //list of orderSpecification Objects
        var orderSpecObjList = [];

        try {
            orderSpecList.forEach(element => {
                //create new orderSpecification Object
                const newOrderSpecObj = new OrderSpec(null, order, element.product, element.personalization, element.amount, );

                //add new Object to list
                orderSpecObjList.push(newOrderSpecObj)
            });
            
            //add new Order to db
            //get back id for new order
            const listOrderSpecIDs =  await orderSpecDatabase.addAllOrderSpecData(orderSpecObjList);

            //set IDs for each orderSpecEntry
            for (let i=0; i < listOrderSpecIDs.length; i++) {
                orderSpecObjList[i].setOrderSpecID(listOrderSpecIDs[i]);
            };

            return orderSpecObjList;
        } catch(ex) {
            console.log("Adding new orderSpecification failed !\n");
        }

    }
}
module.exports = OrderSpecService;