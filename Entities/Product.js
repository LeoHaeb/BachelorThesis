class Product {
    constructor(productID = null, productName = null, material = null, order = null, productionFail = null, visualInspectionProduction = null, 
                    boolPersonalization = null, visualInspectionPersonalization = null, aftersalesNotes = null, orderdate = null) {
        this.productID = productID;
        this.productName = productName;
        this.material = material;
        this.order = order;
        this.boolPersonalization = boolPersonalization; 
        this.productionFail = productionFail;
        this.visualInspectionProduction = visualInspectionProduction;
        this.visualInspectionPersonalization = visualInspectionPersonalization;
        this.aftersalesNotes = aftersalesNotes;
        this.orderdate = orderdate;
    }

    setProductID(id) {
        this.productID = id;
    }

    setMaterialObj(materialObject) {
        this.material = materialObject;
    }
    
    setOrderObj(orderObject) {
        this.order = orderObject;
    }

    async mergeWithOrder(orderObject) {
        this.order = orderObject;
        this.boolPersonalization = orderObject.boolPersonalization;
        this.orderdate = orderObject.orderdate;
    } 
}

module.exports = Product;