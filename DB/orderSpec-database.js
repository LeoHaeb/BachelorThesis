class OrderSpecDatabase {
    constructor(db) {
        this.pool = db.pool;
    }

    //create new Order Entity in database
    async addAllOrderSpecData(orderSpecList) {

        //list for returning IDs from db 
        var listResultIDs = [];
        const client = await this.pool.connect();

        //create 2D-list of orderSpecs
        for (let orderSpecNr = 0; orderSpecNr < orderSpecList.length; orderSpecNr++) {
            var row = [orderSpecList[orderSpecNr].order.orderID, orderSpecList[orderSpecNr].productSec, orderSpecList[orderSpecNr].personalization, orderSpecList[orderSpecNr].amount];

            var query = {
                text: 'insert into db_orderspecification(order_id, prod_spec, personaliz, amount) values ($1, $2, $3, $4) returning id_orderspec;',
                values: row
                //values: [[12, 'Geldbeutel XL', true, 10], [12, 'Geldbeutel XXL', false, 20]]
                //values: [[12, 12], ['geldbeutel XL', 'geldbeutel XXL'], [true, false], [10, 20]]
            }
            var res = await client.query(query);
            //add result to list
            listResultIDs.push(res.rows[0].id_orderspec)
        }

        client.release();
        console.log("Order-database return for createNewOrderSpec : " + listResultIDs);
        return listResultIDs;
    }
}

module.exports = OrderSpecDatabase;