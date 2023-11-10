class OrderSpecification {

    constructor(orderSpecID = null, order = null, productSec = null, personalization = null, amount = null) {
        this.orderSpecID = orderSpecID;
        this.order = order;
        this.productSec = productSec;
        this.personalization = personalization;
        this.amount = amount;
    }

    setOrderSpecID(id) {
        this.orderSpecID = id;
    }
}
module.exports = OrderSpecification;