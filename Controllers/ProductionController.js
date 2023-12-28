const ProductionService = require('../Application/Production-service');
const MaterialController = require('./MaterialController');
const OrderController = require('./OrderController');
const CustomerController = require("./CustomerController");
const OrderService = require('../Application/Order-service');


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
        if (product.order) {
            const orderObject = await orderController.getProductOrderWithID(product.order);
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


    //method to update production table for failed production steps
    async updateProductionFails(req, res) {

        //gather all infromation from http request
        const productionFails = {
            "prodfail": req.body.productionStep,
            "GB_L": req.body.amountFailedPurse_L,
            "GB_XL": req.body.amountFailedPurse_XL,
            "GB_XXL": req.body.amountFailedPurse_XXL,
            "suitcase": req.body.amountFailedSuitCase
        }

        //create new porduction Service Object
        const productionService = new ProductionService();

        //invoke method to add new product
        const updatedProductionIDs = await productionService.updateProductionFails(productionFails, this.productionDatabase);

        console.log("ProductionController return indexlist for updateProductionFails: " + updatedProductionIDs);
        return updatedProductionIDs;
    }


    //method to update production table for failed production steps
    async updateProductionInspection(req, res) {

        //gather all infromation from http request
        const productInspections = {
            "GB_L": req.body.amountPurseInspection_L,
            "GB_XL": req.body.amountPurseInspection_XL,
            "GB_XXL": req.body.amountPurseInspection_XXL,
            "suitcase": req.body.amountSuitCaseInspection
        }

        //create new porduction Service Object
        const productionService = new ProductionService();

        //invoke method to add new product
        const updatedProductionID = await productionService.updateProductionInspections(productInspections, this.productionDatabase);

        //get updated product Object
        const updatedProductObj = this.getProductWithID(updatedProductionID);

        console.log("ProductionController return for updateProductionInspection: " + updatedProductObj);
        return updatedProductObj;
    }


    //method to update production table after personalization
    async updatePersonalizationInspection(objVisualInspectionInfos) {

        //create new porduction Service Object
        const productionService = new ProductionService();

        //get product Object to update
        const productObjToUpdate = await this.getProductWithID(objVisualInspectionInfos.productID);

        //update production db
        const updatedProductIDs = await productionService.updatePersonalizationInspections(productObjToUpdate, objVisualInspectionInfos, this.productionDatabase);

        console.log("ProductionController return Object for updatePersonalizationInspection: " + productObjToUpdate);
        return productObjToUpdate;
    }


    //method to update production table after Scanning
    async updateScannerInspection(req) {

        //get relevant Information from request
        const visualInspection = {
            "productID": req.body.productID,
            "orderID": req.body.orderID,
            "resultVisualInspection": req.body.resultVisualInspection
        }

        //get order Object
        const orderController = new OrderController(this.orderDatabase, this.customerDatabase);
        const orderService = new OrderService();
        const orderObj = await orderController.getProductOrderWithID(visualInspection.orderID);
        //updater order db
        if (visualInspection.resultVisualInspection) {
            var value = 1;
        } else {
            var value = -1;
        }
        await orderService.updateOrderProcessed(orderObj, value, this.orderDatabase)

        //get product Object to update
        const productionService = new ProductionService();
        const productObjToUpdate = await this.getProductWithID(visualInspection.productID);
        //update production db
        const updatedProductID = await productionService.updateScannerInspections(productObjToUpdate, visualInspection, this.productionDatabase);

        console.log("ProductionController return Object for updatePersonalizationInspection: " + productObjToUpdate);
        return productObjToUpdate;
    }


    //Method to bring together Product information <-> Order information
    async bringTogetherPrductAndOrder(assembleInfos) {

        //extract information from assembleInfos
        const id_product = assembleInfos.productID;
        const shopify_order_id = assembleInfos.orderID;

        //get product object
        const productObject = await this.getProductWithID(id_product);

        //check if product is already assigned to different order
        if (productObject.order) {
            const overwriteError = new Error("product was already scanned and assigned to shopify_orderID: " + productObject.order.shopify_orderID);
            throw overwriteError;
        } else if (productObject.productionFail != '0') {
            const failedProductError = new Error("product was marked as damaged: " + productObject.order.shopify_orderID);
            throw failedProductError;
        }
        
        //get first open order Object from db
        const orderController = new OrderController(this.orderDatabase, this.customerDatabase);
        const orderObjectList = await orderController.getOpenOrdersFromShopifyOrderID(shopify_order_id);

        //get order Object from openOrderList that matches with scanned product (name)
        var orderObject = null;
        findRghtOrderLoop: for(let i = 0; i < orderObjectList.length; i++) {
            var orderProductName = orderObjectList[i].productSpec;
            switch (productObject.productName) {
                case "GB_L":
                    if (orderProductName.includes("Geldbeutel") && orderProductName.includes("Klein")) {
                        orderObject = orderObjectList[i];
                        break findRghtOrderLoop;
                    }
                case "GB_XL":
                    if (orderProductName.includes("Geldbeutel") && orderProductName.includes("Mittel")) {
                        orderObject = orderObjectList[i];
                        break findRghtOrderLoop;
                    }
                case "GB_XXL":
                    if (orderProductName.includes("Geldbeutel") && orderProductName.includes("Groß")) {
                        orderObject = orderObjectList[i];
                        break findRghtOrderLoop;
                    }
                case "suitcase":
                    if (orderProductName.includes("Tasche")) {
                        orderObject = orderObjectList[i];
                        break findRghtOrderLoop;
                    }                                       
                default:
                    break;
            }
        };

        //if no match was found
        if (orderObject == null) {
            const noMatchError = new Error("therre is no order available for scanned product with ID = " + productObject.productID + " and \
            name = " + productObject.productName );
            throw noMatchError;
        }

        //merge order-Object and product Object
        const productionService = new ProductionService();
        await productionService.bringTogetherProductAndOrder(productObject, orderObject, this.productionDatabase, this.orderDatabase);

        //update value of order Object for processed orders
        const orderService = new OrderService()
        await orderService.updateOrderProcessed(orderObject, 1, this.orderDatabase);

        //add Information from ordere Object to product Object
        productObject.mergeWithOrder(orderObject);

        console.log("ProductionController return Object for bringTogetherProductAndOrder: " + productObject);
        return productObject;
    }


    //method to update production table after personalization
    async updateShippingStatus(req) {

        //create new porduction Service Object
        const productionService = new ProductionService();

        //get relevant Information from request
        const shippingInfo = {
            "productID": req.body.productID,
            "shippingStatus": req.body.shippingStatus
        }

        //get product Object to update
        const productObjToUpdate = await this.getProductWithID(shippingInfo.productID);

        //update production db
        const updatedProductIDs = await productionService.updateShippingStatus(productObjToUpdate, shippingInfo, this.productionDatabase);

        console.log("ProductionController return Object for updateShippingStatus: " + productObjToUpdate);
        return productObjToUpdate;
    }


    //Method to get all products that are scanned and assigned to orders but with open shippings
    async getOpenShippingProducts(shopify_order_id) {
        
        //create new porduction Service Object
        const productionService = new ProductionService();

        //get IDs for products for shopify_order_id
        const listProductIDs = await productionService.getProductsFromOrder(shopify_order_id, this.productionDatabase, this.orderDatabase);

        //get list of Product Objects with open shipping
        var listProductObjectsOpenShipping = [];
        //loop to create Objects
        for (let i=0; i<listProductIDs.length; i++){
            const productObject = await this.getProductWithID(listProductIDs[i]);
            if (productObject.order) {
                listProductObjectsOpenShipping.push(productObject);
            }
        }
        console.log("ProductionController return Object for getOpenShippingProducts(" + shopify_order_id + "): " + listProductObjectsOpenShipping);
        return listProductObjectsOpenShipping
    }


    //Method to get all products that are scanned and assigned to certain order
    async getProductsFromOrder(shopify_order_id) {
        
        //create new porduction Service Object
        const productionService = new ProductionService();

        //get IDs for products for shopify_order_id
        const listProductIDs = await productionService.getProductsFromOrder(shopify_order_id, this.productionDatabase, this.orderDatabase);

        var listProductObjects = [];
        //loop to create Objects
        for (let i=0; i<listProductIDs.length; i++){
            const productObject = this.getProductWithID(listProductIDs[i]);
            listProductObjects.push(productObject);
        }
        console.log("ProductionController return Object for getProductsFromOrder(" + shopify_order_id + "):" + listProductObjects);
        return listProductObjects;
    }
}

module.exports = ProductionController;