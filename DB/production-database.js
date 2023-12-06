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


    //method to get product by id from db
    async getProductEntityByID(id) {
        const query = {
            text: 'select * from db_production where id_product = $1',
            values: [id],
        }
        const client = await this.pool.connect();
        const productData = await client.query(query);
        client.release();

        console.log("production-database return for getProductEntityByID : " + JSON.stringify(productData.rows));
        return productData;
    }


    //method to update db with failed production steps
    async updateProductEntitiesFails(updates) {

        //object for IDs of failed products
        const failedProducts = {"prodfail": updates.prodfail};

        //for each entry in updates JSON object
        for (let i = 1; i < Object.keys(updates).length; i++) {

            var productName = Object.keys(updates)[i];
            var amount = parseInt(updates[productName]);

            if (amount) {
                const query = {
                    // text: 'with relevantProducts as (select * from db_production where productname = 'GB_XXL' and prodfail = 0 order by id_product limit 5 ) \
                    //update db_production set prodfail = 1 where id_product in (select id_product from relevantProducts);'
                    
                    text: 'with relevantProducts as (select * from db_production where productname = $2 and prodfail = 0 and visuinsp_prod is NULL order by id_product limit $3 ) \
                    update db_production set prodfail = $1, visuinsp_prod = false where id_product in (select id_product from relevantProducts) returning id_product;', 
                    values: [updates.prodfail, productName, amount]
                }
                const client = await this.pool.connect();
                var productFails = await client.query(query);

                //add indizes to return object
                failedProducts[productName] = [];

                productFails.rows.forEach(element => {
                    failedProducts[productName].push(element.id_product);
                });

                client.release();   
            }
        };

        if (productFails) {
            console.log("production-database return for updateProductEntitiesFails : " + JSON.stringify(productFails.rows));
        }
        return failedProducts;
    } 


    //method to update db with inspected products
    async updateProductEntitiesInspection(inspection) {

        //JSON Object for IDs of products that were inspected
        var inspectedProducts = {};

        //for each entry in inspection JSON object
        for (let i = 0; i < Object.keys(inspection).length; i++) {

            var productName = Object.keys(inspection)[i];
            var amountOK = parseInt(inspection[productName][0]);
            var amountNOK = parseInt(inspection[productName][1]);

            //list for inspected products
            inspectedProducts[productName] = [];

            if (amountOK) {
                const queryOK = {
                    //sql query to update OK products
                    text: 'with productsOK as (select * from db_production where productname = $1 and prodfail = 0 and visuinsp_prod is NULL order by id_product limit $2 )\
                    update db_production set visuinsp_prod = true where id_product in (select id_product from productsOK) returning id_product;',
                    values: [productName, amountOK]
                }
                const client = await this.pool.connect();
                var productInspections = await client.query(queryOK);

                //add indizes to return object
                productInspections.rows.forEach(element => {
                    inspectedProducts[productName].push(element.id_product);
                });

                client.release();   
            }
            if (amountNOK) {
                const queryNOK = {                    
                    //sql query to update NOK products
                    text: 'with productsNOK as (select * from db_production where productname = $1 and prodfail = 0 and visuinsp_prod is NULL order by id_product limit $2 )\
                    update db_production set visuinsp_prod = false where id_product in (select id_product from productsNOK) returning id_product;',
                    values: [productName, amountNOK]
                }
                const client = await this.pool.connect();
                var productInspections = await client.query(queryNOK);

                //add indizes to return object
                productInspections.rows.forEach(element => {
                    inspectedProducts[productName].push(element.id_product);
                });

                client.release();   
            }  
        };

        if (inspectedProducts) {
            console.log("production-database return for updateProductEntitiesFails : " + inspectedProducts);
        }
        return inspectedProducts;
    } 
}

module.exports = ProductionDatabase;