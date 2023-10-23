const CustomerDatabase = require("../Gateways/customer-database");

class CustomerService {

    constructor(customerDatabase) {
        this.customerDatabase = customerDatabase;
    }
}

module.exports = CustomerDatabase;