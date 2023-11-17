class Product {
    constructor(productID = null, productName = null, material = null, order = null, productionFail = null, visualInspectionProduction = null, visualInspectionPersonalization = null, aftersalesNotes = null) {
        this.productID = productID;
        this.productName = productName;
        this.material = material;
        this.order = order;
        this.productionFail = productionFail;
        this.visualInspectionProduction = visualInspectionProduction;
        this.visualInspectionPersonalization = visualInspectionPersonalization;
        this.aftersalesNotes = aftersalesNotes;
    }

    setProductID(id) {
        this.productID = id;
    }
}

module.exports = Product;