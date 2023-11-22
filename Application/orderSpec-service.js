const OrderSpec = require('../Entities/OrderSpecification');

//class for services to work with order-objects
class OrderSpecService{
    
    //constructor for orderSpecification class
    //each order class has connection to a database object orderdatabase
    constructor(){
    }

    //method to add new object orderspec to orderspec-db
    async createNewOrderSpec(listOrderItems, reOrderObj, orderSpecDatabase) {

        //list of orderSpecification Objects
        var orderSpecObjList = [];

        try {
            listOrderItems.forEach(element => {
                //create new orderSpecification Object
                const newOrderSpecObj = new OrderSpec(null, reOrderObj, element.name, "default_personalization", element.quantity );

                //add new Object to list
                orderSpecObjList.push(newOrderSpecObj)
            });
            
            //add new orderspec to db
            //get back list of IDs for each new orderspec
            const listOrderSpecIDs =  await orderSpecDatabase.addAllOrderSpecData(orderSpecObjList);

            //set IDs for each orderSpecEntry
            for (let i=0; i < listOrderSpecIDs.length; i++) {
                orderSpecObjList[i].setOrderSpecID(listOrderSpecIDs[i]);
            };

            console.log("Orderspec-service return for createNewOrderSpec: " + orderSpecObjList);
            return orderSpecObjList;
        } catch(ex) {
            console.log("Problem in class OrderSpec-service in method createNewOrderSpec");
        }
    }
}
module.exports = OrderSpecService;