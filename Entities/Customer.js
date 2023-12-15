class Customer {

    //constructor for creating new customer object, default value for customerNr = null
    constructor(customerNr = null, customerEmail, contactEmail, customerPersonalization, addresses) {
        this.customerNr = customerNr;
        this.customerEmail = customerEmail;
        this.contactEmail = contactEmail;
        this.customerPersonalization = customerPersonalization;

        if (addresses[0]) {
            this.customer_defaultAddress_name = addresses[0].name;
            this.customer_defaultAddress_place = addresses[0].place;
            this.customer_defaultAddress_postcode = addresses[0].postcode;
            this.customer_defaultAddress_street = addresses[0].street;
            this.customer_defaultAddress_streetNr = addresses[0].streetNr;
            this.customer_defaultAddress_company = addresses[0].company;    
        } else {
            this.customer_defaultAddress_name = null;
            this.customer_defaultAddress_place = null;
            this.customer_defaultAddress_postcode = null;
            this.customer_defaultAddress_street = null;
            this.customer_defaultAddress_streetNr = null;
            this.customer_defaultAddress_company = null;    
        }


        if (addresses[1]){       
            this.customer_shippingAddress_name = addresses[1].name;
            this.customer_shippingAddress_place = addresses[1].place;
            this.customer_shippingAddress_postcode = addresses[1].postcode;
            this.customer_shippingAddress_street = addresses[1].street;
            this.customer_shippingAddress_streetNr = addresses[1].streetNr;
            this.customer_shippingAddress_company = addresses[1].company;
        } else {
            this.customer_shippingAddress_name = null;
            this.customer_shippingAddress_place = null;
            this.customer_shippingAddress_postcode = null;
            this.customer_shippingAddress_street = null;
            this.customer_shippingAddress_streetNr = null;
            this.customer_shippingAddress_company = null;
        }


        if (addresses[2]) {
            this.customer_billingAddress_name = addresses[2].name;
            this.customer_billingAddress_place = addresses[2].place;
            this.customer_billingAddress_postcode = addresses[2].postcode;
            this.customer_billingAddress_street = addresses[2].street;
            this.customer_billingAddress_streetNr = addresses[2].streetNr;
            this.customer_billingAddress_company = addresses[2].company;
        } else {
            this.customer_billingAddress_name = null;
            this.customer_billingAddress_place = null;
            this.customer_billingAddress_postcode = null;
            this.customer_billingAddress_street = null;
            this.customer_billingAddress_streetNr = null;
            this.customer_billingAddress_company = null;
        }

    }

    setCustomerNr(id) {
        this.customerNr = id;
    }
}

module.exports = Customer;
