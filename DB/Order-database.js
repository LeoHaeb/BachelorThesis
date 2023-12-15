class OrderDatabase {
    constructor(db) {
        this.pool = db.pool;
    }

    //method to get several orders from database
    async getProductionOrderEntities(amount) {
        const client = await this.pool.connect();
        const query = {
            text: 'select * from db_product_ordering order by product_order_id limit $1;',
            values: [amount]
        }
        const res = await client.query(query);
        client.release();
        console.log("Order-database return for getProductionOrderEntities(" + amount + ") : " + JSON.stringify(res.rows));
        return res;
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

    

    async addAllOrderEntities(listProductOrders) {
        
        //list for returning IDs from db 
        var listResultIDs = [];
        const client = await this.pool.connect();

        //create 2D-list of orderSpecs
        //boolean value for personalization attribute is set to false per default until clear how personalization object is provided to server
        for (let productOrderNr = 0; productOrderNr < listProductOrders.length; productOrderNr++) {
            var row = [listProductOrders[productOrderNr].shopify_orderID, listProductOrders[productOrderNr].productSpec, 
                        listProductOrders[productOrderNr].boolPersonalization, listProductOrders[productOrderNr].amount, 
                        parseInt(listProductOrders[productOrderNr].customer.customerNr), listProductOrders[productOrderNr].orderDate];

            var query = {
                text: 'insert into db_product_ordering(shopify_order_id, prod_spec, personaliz, amount, customer_id, orderdate) values ($1, $2, $3, $4, $5, $6) returning product_order_id;',
                values: row
                //values: [[12, 'Geldbeutel XL', true, 10], [12, 'Geldbeutel XXL', false, 20]]
                //values: [[12, 12], ['geldbeutel XL', 'geldbeutel XXL'], [true, false], [10, 20]]
            }
            var res = await client.query(query);
            //add result to list
            listResultIDs.push(res.rows[0].product_order_id)
        }

        client.release();
        console.log("Order-database return for createNewOrderSpec : " + listResultIDs);
        return listResultIDs;
    }
}

module.exports = OrderDatabase;
