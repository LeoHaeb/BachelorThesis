class Customer {

    //constructor for creating new customer object, default value for customerNr = null
    constructor(customerNr = null, customerName, customerAdrPlace, customerPostCode, customerAdrStreet, customerAdrNr, customerPersonalization, customerEmail) {
        this.customerNr = customerNr;
        this.customerName = customerName;
        this.customerAdrNr = customerAdrNr;
        this.customerAdrStreet = customerAdrStreet;
        this.customerAdrPlace = customerAdrPlace;
        this.customerPostCode = customerPostCode;
        this.customerPersonalization = customerPersonalization;
        this.customerEmail = customerEmail;
    }

    setCustomerNr(id) {
        this.customerNr = id;
    }
}

module.exports = Customer;