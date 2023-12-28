class OrderDatabase {

    constructor(db) {
        this.pool = db.pool;
    }

    //method to get order with ID
    async getProductionOrderEntitywithID(order_ID) {
        const client = await this.pool.connect();
        const query = {
            text: 'select * from db_product_ordering where product_order_id = $1;',
            values: [order_ID]
        }
        const order = await client.query(query);
        client.release();
        console.log("Order-database return for getProductionOrderEntitywithID(" + order_ID + ") : " + JSON.stringify(order.rows));
        return order;
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


    //method to get orders from database for certain shopify_order_id 
    async getOpenProductionOrderEntitiesFromShopifyID(shopify_order_id) {
        const client = await this.pool.connect();
        const query = {
            text: 'select * from db_product_ordering where shopify_order_id = $1 and amount != processed order by amount ASC;',
            values: [shopify_order_id]
        }
        const res = await client.query(query);
        client.release();
        console.log("Order-database return for getOpenProductionOrderEntitiesFromShopifyID(" + shopify_order_id + ") : " + JSON.stringify(res.rows));
        return res;
    }


    //Method to get first open product ordering from db
    async getFirstOpenOrderEntityWithShopifyID(shopify_order_id) {
        const client = await this.pool.connect();
        const query = {
            text: 'select * from db_product_ordering where shopify_order_id = $1 and amount != processed limit 1;',
            values: [shopify_order_id]
        }
        const res = await client.query(query);
        client.release();
        console.log("Order-database return for getFirstOpenOrderEntityWithShopifyID(" + shopify_order_id + ") : " + JSON.stringify(res.rows));
        return res;
    }


    //method to get next open product ordering to process from db fro scanning surface
    async getNextOpenOrderEntities(index) {
        const client = await this.pool.connect();

        var query = {
/*             text: 'with openOrders as (select * from db_product_ordering where amount != processed order by orderdate asc), \
            firstRowOpenOrders as (select * from openOrders limit 1) \
            select * from openOrders where shopify_order_id in (select shopify_order_id from firstRowOpenOrders);', */
            text: 'with openOrders as (select * from db_product_ordering where amount != processed),\
            orderSelection as (select shopify_order_id, orderdate from openOrders group by shopify_order_id, orderdate) \
            select * from orderSelection;',
        }

        const res = await client.query(query);
        client.release();
        console.log("Order-database return for getNextOpenOrders" + JSON.stringify(res.rows));
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

    
    //add list of orders to db
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


    //method to update processed column when product is scanned
    async updateOrderEntityProcessed(orderObject, value) {
        const client = await this.pool.connect();
        const query = {
            text: 'update db_product_ordering set processed = processed + $2 where product_order_id = $1 returning product_order_id',
            values: [orderObject.productOrderID, value],
        }
        const updatedOrder = await client.query(query);
        client.release();  
        console.log("Order-database return for updateOrderEntityProcessed : " + updatedOrder);
        return updatedOrder;
    }
}

module.exports = OrderDatabase;
