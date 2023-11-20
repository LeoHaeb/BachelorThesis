const Product = require('../Entities/Product');

class ProductionService {

    constructor() {
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