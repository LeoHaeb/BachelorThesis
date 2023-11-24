const ProductionService = require('../Application/Production-service');
const MaterialController = require('./MaterialController');
const OrderController = require('./OrderController');
const CustomerController = require("./CustomerController");


class ProductionController {

    constructor(productionDatabase, materialDatabase, orderDatabase, customerDatabase) {
        this.productionDatabase = productionDatabase;
        this.materialDatabase = materialDatabase;
        this.orderDatabase = orderDatabase;
        this.customerDatabase = customerDatabase;
    }


    //method to get product object with productID as id
    async getProductWithID(id) {
        //create productionService Object
        const productionService = new ProductionService();

        //invoke method from Use Case Layer to work with product object, dependency injection with production database
        const product = await productionService.getProductWithID(id, this.productionDatabase);

        //get material object from db
        const materialController = new MaterialController(this.materialDatabase);
        const materialObj = await materialController.getMaterialwithID(product.material);
        //set material Object to product Object
        product.setMaterialObj(materialObj);

        //get order Object from db
        const orderController = new OrderController(this.orderDatabase, this.customerDatabase);
        // check if order already asigned to product
        if (product.customer) {
            const orderObject = await orderController.getProductOrderWithID(product.customer);
            //set order Object to product Object
            product.setOrderObj(orderObject);
        }

        console.log("ProductionController return for getProductwithID: " + product);
        //return product object
        return product;
    }


    //method for adding new Products for manufacturing
    async addNewProducts(req, res) {

        //gather all information from http request
        const productionList = req.body.listNewProducts;

        //lists for creating product objects
        const listProductNames = [];
        const listProductAmounts = [];
        const listProductMaterials = [];

        //create MaterialController Object for working with Material Objects
        const materialController = new MaterialController(this.materialDatabase)

        //fill lists
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
        const addedProductsIndexList = await productionService.addNewProducts(listProductNames, listProductAmounts, listProductMaterials, this.productionDatabase);

        console.log("ProductionController return indexlist for addNewProduct: " + addedProductsIndexList);
        return addedProductsIndexList;
    }
}

module.exports = ProductionController;