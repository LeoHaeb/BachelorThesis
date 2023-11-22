const CustomerService = require("../Application/Customer-service");

class CustomerCOntroller{

    constructor (customerDatabase) {
        this.customerDatabase = customerDatabase;
    }


    //method to get custoemr with id as cust_nr 
    async getCustomerWithID(id) {
        //create Custoemr Service Object
        const customerService = new CustomerService(this.customerDatabase);  

        //invoke method from Use Case Layer to work with Customer object, dependency injection with customer database
        const customer = await customerService.getCustomerWithID(id, this.customerDatabase);

        console.log("CustomerController return for getCustomerWithID: " + customer);
        return customer;
    }


    //method to add custoemr to db 
    async addNewCUstomer(reqCustomer) {
        //create Customer Service Object
        const customerService = new CustomerService(this.customerDatabase);  

        //get all information from request to creat a customer object 
        const customerID = reqCustomer.id
        const customerName = reqCustomer.first_name + " " + reqCustomer.last_name;
        //---------------------------------------------------------------------------------
        //perosnalization object not yet in JSON from shopify ???
        const personalizationObject = "xxx";
        //---------------------------------------------------------------------------------     

        const customerPlace = reqCustomer.default_address.city;
        const customerPostcode = reqCustomer.default_address.zip

        //extract address information
        const customerAddressArray = reqCustomer.default_address.address1.split(" ");
        const customerStreet = customerAddressArray.slice(customerAddressArray.lentgh - 2, -1).join(" ");

        const customerStreetNr = customerAddressArray[(customerAddressArray.length - 1)];
        const customerEmail = reqCustomer.email;

        //invoke method from Use Case Layer to work with Customer object, dependency injection with customer database
        const customer = await customerService.addNewCustomer(customerID, customerName, customerPlace, customerPostcode, 
                                                                customerStreet, customerStreetNr, personalizationObject, customerEmail, this.customerDatabase);

        console.log("CustomerController return for addNewCustoemr: " + customer);
        return customer;
    }
}

module.exports = CustomerCOntroller;