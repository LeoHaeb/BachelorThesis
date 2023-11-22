class OrderSpecification {

    constructor(orderSpecID = null, order = null, productSpec = null, personalization = null, amount = null) {
        this.orderSpecID = orderSpecID;
        this.order = order;
        this.productSpec = productSpec;
        this.personalization = personalization;
        this.amount = amount;
    }

    setOrderSpecID(id) {
        this.orderSpecID = id;
    }
}
module.exports = OrderSpecification;