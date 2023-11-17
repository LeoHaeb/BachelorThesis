class ProductionDatabase {

    constructor(db) {
        this.pool = db.pool;
    }

    async addNewProductEntity(newProduct, amount) {

        const listProductID = [];

        const client = await this.pool.connect();
        const query = {
            text: 'insert into db_production(mat_nr, productname) values ($1, $2) returning id_product',
            values: [newProduct.material.matNr, newProduct.productName]
        }

        //add entry for each new Product
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