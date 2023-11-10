class OrderDatabase {
    constructor(db) {
        this.pool = db.pool;
    }

    //create nwe Order Entity in database
    async createNewOrder(order) {
        const client = await this.pool.connect();
        const query = {
            text: 'insert into db_order(customer_nr) values ($1) returning order_id;',
            values: [order.customer.customerNr]
        }
        const res = await client.query(query);
        client.release();
        console.log("Order-database return for createNewOrder : " + JSON.stringify(res.rows));
        return res;
    }
}

module.exports = OrderDatabase;