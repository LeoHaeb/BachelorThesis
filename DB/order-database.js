class OrderDatabase {
    constructor(db) {
        this.pool = db.pool;
    }

    //create new order entity in database
    async createNewOrderEntity(order) {
        const client = await this.pool.connect();
        const query = {
            text: 'insert into db_order(order_id, customer_nr) values ($1, $2) returning order_id;',
            values: [order.orderID, order.customer.customerNr]
        }
        const res = await client.query(query);
        client.release();
        console.log("Order-database return for createNewOrder : " + JSON.stringify(res.rows));
        return res;
    }
}

module.exports = OrderDatabase;