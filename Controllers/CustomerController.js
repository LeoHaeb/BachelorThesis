const CustomerService = require("../Application/customer-service");
const Customer = require("../Entities/Customer");

class CustomerCOntroller{

    constructor (customerDatabase) {
        this.customerDatabase = customerDatabase;
    }



    async getCustomerWithID(id) {
        //create Custoemr Service Object
        const customerService = new CustomerService(this.customerDatabase);  

        //invoke method from Use Case Layer to work with Customer object, dependency injection with customer database
        const customer = await customerService.getCustomerWithID(id, this.customerDatabase);

        console.log("CustomerController return for getCustomerWithID: " + customer);
        return customer;
    }


    async addNewCUstomer(newCustomer) {
        //create Customer Service Object
        const customerService = new CustomerService(this.customerDatabase);  

        //invoke method from Use Case Layer to work with Customer object, dependency injection with customer database
        const customer = await customerService.addNewCustomer(newCustomer, this.customerDatabase);

        console.log("CustomerController return for addNewCustoemr: " + customer);
        return customer;
    }
}

module.exports = CustomerCOntroller;