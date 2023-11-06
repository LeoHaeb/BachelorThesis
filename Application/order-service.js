//class for services to work with order-objects
class OrderService{
    
    //constructor for order class
    //each order class has connection to a database object orderdatabase
    constructor(orderDatabase){
        this.orderDatabase = orderDatabase;
    }

    //method to add new object order to db_order
    async createNewOrder(order) {
        this.orderDatabase.creatNewOrderDB(order);
    }

}