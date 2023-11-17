const ProductionService = require('../Application/production-service');
const MaterialController = require('./MaterialController');
const OrderController = require('./OrderController');
//const CustomerController = require("./CustomerController");


class ProductionController {

    constructor(productionDatabase, materialDatabase) {
        this.productionDatabase = productionDatabase;
        this.materialDatabase = materialDatabase;
    }

    //function for adding new Products for manufacturing
    async addNewProducts(req, res) {

        //gather all information from http request
        const productionList = req.body.listNewProducts;

        const listProductNames = [];
        const listProductAmounts = [];
        const listProductMaterials = [];

        //create MaterialController Object for working with Material Objects
        const materialController = new MaterialController(this.materialDatabase)

        //productionList.forEach(async element => 
        for (let i = 0; i < productionList.length; i++) {
            //check if amount > 0
            if (productionList[i].amount && productionList[i].amount > 0 ) {
                listProductNames.push(productionList[i].productName);
                listProductAmounts.push(parseInt(productionList[i].amount));
    
                //create new material Object
                var newProductMaterial = await materialController.getMaterialwithID(parseInt(productionList[i].matNr));
                //add new Material Object to list
                listProductMaterials.push(newProductMaterial);
            }
        };

        //create new porduction Service Object
        const productionService = new ProductionService();

        //invoke method to add new product
        const addedProducts = await productionService.addNewProducts(listProductNames, listProductAmounts, listProductMaterials, this.productionDatabase);

        console.log("ProductionController return indexlist for addNewProduct: " + addedProducts);
        return addedProducts;
    }
}

module.exports = ProductionController;