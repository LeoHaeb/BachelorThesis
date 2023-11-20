class ProductionDatabase {

    constructor(db) {
        this.pool = db.pool;
    }


    //method to add new product entries to db
    async addNewProductEntity(newProduct, amount) {

        //list for IDs of new products
        const listProductID = [];

        const client = await this.pool.connect();
        const query = {
            text: 'insert into db_production(mat_nr, productname) values ($1, $2) returning id_product',
            values: [newProduct.material.matNr, newProduct.productName]
        }

        //add entry for each new Product x amount
        for (let i = 0; i < amount; i++) {
            const res = await client.query(query);
            //add id for new Product to list
            listProductID.push(res.rows[0].id_product);
            //release client
        }
        client.release();
        console.log("production-database return for addNewProductEntity : " + listProductID);

        return listProductID;
    }
}

module.exports = ProductionDatabase;