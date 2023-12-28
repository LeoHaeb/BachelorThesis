const OrderDatabase = require('../DB/Order-database');
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
            //return product object
            return productReturnObj;
        }
        catch(error) {
            console.log("error: " + error);
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
            console.log("error: " + error);
            console.log("Problem in class Production-service in method addNewProduct");
        }
    }


    //method to update production database with production fails
    async updateProductionFails(updates, productionDatabase) {
        try {
            //update production db with information from updates about failed products
            const failedProductIDs = await productionDatabase.updateProductEntitiesFails(updates);

            console.log("ProductionService return list of indizes for updateProductionFails: " + failedProductIDs);
            return failedProductIDs;
        } catch(error) {
            console.log("error: " + error);
            console.log("Problem in class Production-service in method updateProductionFails");
        }
    }


    //Method to update production database with product inspections
    async updateProductionInspections(inspections, productionDatabase) {
        try {
            //update production db with information from updates about failed products
            const inspectedProductIDs = await productionDatabase.updateProductEntitiesInspection(inspections);

            console.log("ProductionService return list of indizes for updateProductionInspections: " + inspectedProductIDs);
            return inspectedProductIDs;
        } catch(error) {
            console.log("error: " + error);
            console.log("Problem in class Production-service in method updateProductionInspections");
        }
    }


    //Method to update production database with product inspections
    async updatePersonalizationInspections(productObjToUpdate, objVisualInspectionInfos, productionDatabase) {
        try {
            //update production db with information from updates about failed products in personalization
            const inspectedProductID = await productionDatabase.updateProductEntitiesPersonalization(objVisualInspectionInfos);

            //get updated Product
            productObjToUpdate.setVisuInspectionPersonalizatioin(objVisualInspectionInfos.resultVisualInspection); 

            console.log("ProductionService  return for updatePersonalizationInspections(" + objVisualInspectionInfos.productID + ") : " + inspectedProductID);
            return inspectedProductID.rows[0];
        } catch(error) {
            console.log("error: " + error);
            console.log("Problem in class Production-service in method updatePersonalizationInspections");
        }
    }


    //Method to update production database with product inspections
    async updateScannerInspections(productObjToUpdate, objVisualInspectionInfos, productionDatabase, orderDatabase) {
        try {
            //update production db with information from updates 
            const inspectedProductID = await productionDatabase.updateProductEntitiesScanning(objVisualInspectionInfos);

            // update Product Object
            productObjToUpdate.resetWithProdFail(objVisualInspectionInfos.resultVisualInspection); 

            console.log("ProductionService  return for updateScannerInspections(" + objVisualInspectionInfos.productID + ") : " + inspectedProductID);
            return inspectedProductID.rows[0];
        } catch(error) {
            console.log("error: " + error);
            console.log("Problem in class Production-service in method updateScannerInspections");
        }
    }


    //Method to update production database with product inspections
    async updateShippingStatus(productObjToUpdate, shippingInfo, productionDatabase) {
        try {
            //update production db with information from updates about shipped products
            const shippedProductID = await productionDatabase.updateProductEntitiesShipping(shippingInfo);

            //get updated Product
            productObjToUpdate.setShippingStatus(shippingInfo.shippingStatus); 

            console.log("ProductionService  return for updateShippingStatus(" + shippingInfo.productID + ") : " + shippedProductID);
            return shippedProductID.rows[0];
        } catch(error) {
            console.log("error: " + error);
            console.log("Problem in class Production-service in method updateShippingStatus");
        }
    }
    
    //Method to add order information to product object
    async bringTogetherProductAndOrder(productObject, orderObject, productionDatabase, orderDatabase) {
        try {
            //update production db with information from product Object and order Object
            const updatedProductID = await productionDatabase.bringTogetherProductAndOrderEntity(productObject, orderObject);

            console.log("ProductionService updated product with ID: " + updatedProductID);
        } catch(error) {
            console.log("error: " + error);
            console.log("Problem in class Production-service in method bringTogetherProductAndOrder");
        }
    }

    async getProductsFromOrder(shopify_order_id, productionDatabase, orderDatabase) {
        try {
            const listPorductIDs = [];
            //get all IDs from db_product that have same order
            const rows = await productionDatabase.getProductEntitiesFromORder(shopify_order_id);
            rows.forEach(element => {
                listPorductIDs.push(element.id_product)
            });

            console.log("ProductionService return for getProductsFromOrder(" + shopify_order_id + "): " + listPorductIDs);
            return listPorductIDs;
        } catch(error) {
            console.log("error: " + error);
            console.log("Problem in class Production-service in method getProductsFromOrder");
        }
    }
}

module.exports = ProductionService;
