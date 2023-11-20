class Customer {

    //constructor for creating new customer object, default value for customerNr = null
    constructor(customerNr = null, customerName, customerAdrStreet, customerAdrPlace, customerPostCode, customerAdrNr, customerPersonalization, customerEmail, customerPswd) {
        this.customerNr = customerNr;
        this.customerName = customerName;
        this.customerAdrNr = customerAdrNr;
        this.customerAdrStreet = customerAdrStreet;
        this.customerAdrPlace = customerAdrPlace;
        this.customerPostCode = customerPostCode;
        this.customerPersonalization = customerPersonalization;
        this.customerEmail = customerEmail;
        this.customerPswd = customerPswd;
    }

    setCustomerNr(id) {
        this.customerNr = id;
    }
}

module.exports = Customer;