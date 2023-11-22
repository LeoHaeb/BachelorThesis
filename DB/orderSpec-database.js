class OrderSpecDatabase {
    constructor(db) {
        this.pool = db.pool;
    }

    //create new Order Entity in database
    async addAllOrderSpecData(orderSpecObjList) {

        //list for returning IDs from db 
        var listResultIDs = [];
        const client = await this.pool.connect();

        //create 2D-list of orderSpecs
        //boolean value for personalization attribute is set to false per default until clear how personalization object is provided to server
        for (let orderSpecNr = 0; orderSpecNr < orderSpecObjList.length; orderSpecNr++) {
            var row = [orderSpecObjList[orderSpecNr].order.orderID, orderSpecObjList[orderSpecNr].productSpec, 
                        false, orderSpecObjList[orderSpecNr].amount];

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