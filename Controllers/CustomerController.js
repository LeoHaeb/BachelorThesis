const CustomerService = require("../Application/Customer-service");

class CustomerCOntroller{

    constructor (customerDatabase) {
        this.customerDatabase = customerDatabase;
    }


    //method to get custoemr with id as cust_nr 
    async getCustomerWithID(id) {
        //create Custoemr Service Object
        const customerService = new CustomerService();  

        //invoke method from Use Case Layer to work with Customer object, dependency injection with customer database
        const customer = await customerService.getCustomerWithID(id, this.customerDatabase);

        console.log("CustomerController return for getCustomerWithID: " + customer);
        return customer;
    }


    //method to add custoemr to db 
    async addNewCUstomer(singleOrder) {

        //create Customer Service Object
        const customerService = new CustomerService(this.customerDatabase);  

        //get all relevant Objects out of order
        const reqCustomer = singleOrder.customer;
        const reqShippingAddress = singleOrder.shipping_address;
        const reqBillingAddress = singleOrder.billing_address;

        //get all information from request to creat a customer object 
        const customerID = reqCustomer.id
        //---------------------------------------------------------------------------------
        //perosnalization object not yet in JSON from shopify ???
        const personalizationObject = "xxx";
        //---------------------------------------------------------------------------------     
        const customer_email = reqCustomer.email;
        const contact_email = singleOrder.contact_email;


        //gather all address infomration
        var listReqAddressObjects = [reqCustomer.default_address, singleOrder.shipping_address, singleOrder.billing_address];
        var listAddressObjects = []

        //loop over each address object
        listReqAddressObjects.forEach(element => {

            //get information of street and street nr
            var addressArray = element.address1.split(" ");
            var street = addressArray.slice(addressArray.lentgh - 2, -1).join(" ");
            var streetNr = addressArray[(addressArray.length - 1)];

            //create address object for default address, shipping address, billing address
            var addressObj = {
                "name": element.first_name + " " + element.last_name,
                "place": element.city,
                "postcode": element.zip,
                "street": street,
                "streetNr": streetNr,
                "company": element.company
            }
            
            //add new object to list for addresses
            listAddressObjects.push(addressObj);
        })
        
/*         const customer_defaultPlace = reqCustomer.default_address.city;
        const customer_defaultPostcode = reqCustomer.default_address.zip

        //extract address information
        const customer_defaultAddressArray = reqCustomer.default_address.address1.split(" ");
        const customerStreet = customerAddressArray.slice(customerAddressArray.lentgh - 2, -1).join(" ");
        const customerStreetNr = customerAddressArray[(customerAddressArray.length - 1)]; */

        const customerEmail = reqCustomer.email;

        //invoke method from Use Case Layer to work with Customer object, dependency injection with customer database
        const customer = await customerService.addNewCustomer(customerID, customer_email, contact_email, personalizationObject, listAddressObjects, this.customerDatabase);

        console.log("CustomerController return for addNewCustoemr: " + customer);
        return customer;
    }


    //method if no customer in request -> make default customer in db
    async addNewDefaultCustomer(singleOrder) {

        //create Customer Service Object
        const customerService = new CustomerService(this.customerDatabase);  

        //get contact email if available
        const contact_email = singleOrder.contact_email;

        //---------------------------------------------------------------------------------
        //perosnalization object not yet in JSON from shopify ???
        const personalizationObject = "xxx";
        //---------------------------------------------------------------------------------     
        
        //create list for address objects
        var listReqAddressObjects = [];

        if(singleOrder.shipping_address) {
            listReqAddressObjects.push(singleOrder.shipping_address);
        }
        if(singleOrder.billing_address) {
            listReqAddressObjects.push(singleOrder.billing_address);
        }

        //gather all address infomration
        var listAddressObjects = []

        //loop over each address object
        listReqAddressObjects.forEach(element => {

            //get information of street and street nr
            var adressArray = element.address1.split(" ");
            var street = customerAddressArray.slice(adressArray.lentgh - 2, -1).join(" ");
            var streetNr = customerAddressArray[(adressArray.length - 1)];

            //create address object for default address, shipping address, billing address
            var addressObj = {
                "name": element.first_name + " " + element.last_name,
                "place": element.city,
                "postcode": element.zip,
                "street": street,
                "streetNr": streetNr,
                "company": element.company
            }
            
            //add new object to list for addresses
            listAddressObjects.push(addressObj);
        })


        //invoke method from Use Case Layer to work with Customer object, dependency injection with customer database
        const customer = await customerService.addNewCustomer(null, null, contact_email, personalizationObject, listAddressObjects, this.customerDatabase);

        console.log("CustomerController return for addNewCustoemr: " + customer);
        return customer;
  
    }
}

module.exports = CustomerCOntroller;