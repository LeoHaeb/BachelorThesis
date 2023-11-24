const Product = require('../Entities/Product');

class ProductionService {

    constructor() {
    }


    //method to get product from database for specific productID = id
    async getProductWithID(id, productionDatabase) {
        try {
            //get entry from database for id
            const product = await productionDatabase.getProductEntityByID(id);
            const productRow = product.rows[0];

            //get Material Object
            const matNr = productRow.mat_nr;



            //create Material Object with information from database
            //Objects for product-attributes: material, order will be set in next outer controller-layer
            const productReturnObj = new Product(productRow.id_product, productRow.productname, productRow.mat_nr, productRow.order_id, productRow.prodfail, 
                productRow.visuinsp_prod, productRow.personal , productRow.visuinsp_personal, productRow.aftersales, productRow.orderdate);

            console.log("ProductService return for getProductWithID(id = " + id + "): " + productReturnObj);
            //return material object
            return productReturnObj;
        }
        catch(error) {
            console.log("Problem in class Product-service in method getMaterialwithID(" + id + ")");
        }
    }

    //method to add new products to production db
    async addNewProducts(listProductNames, listProductAmounts, listProductMaterials, productionDatabase) {
        try {

            //list for new product objects
            const returnListIndizesNewProducts = [];

            //create product objects and add to db
            for (let i = 0; i < listProductNames.length; i++) {
                //create new product object 
                var newProduct = new Product(null, listProductNames[i], listProductMaterials[i]) 

                //add each new Product x amount to db
                var listNewProductID = await productionDatabase.addNewProductEntity(newProduct, listProductAmounts[i]);

                returnListIndizesNewProducts.push({"productname": listProductNames[i], "indizes": listNewProductID});

/*                 //set ids from db for each new Product
                for (let j = 0; j < listNewPorductID.length; j++) {
                    //create several idetnitcal objects 
                    const newSingleProduct = new Product(productname = newProduct.productName, productName = newProduct.productName, material = newProduct.material) 
                    newSingleProduct.setProductID(listNewPorductID[j]);
                } 
                //add new product to list
                listNewProducts.pop(newSingleProduct); */
            }

            //return list with new Objects#
            console.log("ProductionService return list of indizes for addNewProducts: " + returnListIndizesNewProducts);
            return returnListIndizesNewProducts
        }
        catch (ex) {
            console.console.error();
            console.log("Problem in class Production-service in method addNewProduct");
        }
    }

}

module.exports = ProductionService;