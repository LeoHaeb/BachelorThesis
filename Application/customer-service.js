const Customer = require("../Entities/Customer");

class CustomerService {

    //constructor for Service Object 
    //database connection is part of object
    constructor() {
    }

    //method to get customers from database for specific customerNr = id
    async getCustomerWithID(id, customerDatabase) {
        try {

            //get entry from customer db
            const customer = await customerDatabase.getCustomerById(id);
            const customerRow = customer.rows[0];

            //create list of addresses for customer Obj creation
            const addresses = [
                {
                    "name": customerRow.default_cust_name, 
                    "place": customerRow.default_place,
                    "postcode": customerRow.default_postcode,
                    "street": customerRow.default_street,
                    "streetNr": customerRow.default_streetnr,
                    "company": customerRow.default_company
                }, 
                {
                    "name": customerRow.shipping_cust_name, 
                    "place": customerRow.shipping_place,
                    "postcode": customerRow.shipping_postcode,
                    "street": customerRow.shipping_street,
                    "streetNr": customerRow.shipping_streetnr,
                    "company": customerRow.shipping_company
                },
                {
                    "name": customerRow.billing_cust_name, 
                    "place": customerRow.billing_place,
                    "postcode": customerRow.billing_postcode,
                    "street": customerRow.billing_street,
                    "streetNr": customerRow.billing_streetnr,
                    "company": customerRow.billing_company
                }
            ]

            //create new Custoemr Object with information from database 
            const customerReturnObject = new Customer(customerRow.cust_nr,customerRow.cust_email, customerRow.contact_email, customerRow.personal_obj, addresses); 

            console.log("CustomerService return for getCustomerWithID(id = " + id + "): " + customerReturnObject);
            return customerReturnObject;
        }
        catch(ex) {
            console.log("Problem in class Customer-service in method getCustomerWithID(" + id + ")");
        }
    }


    
    //method for adding new customer object to customer database
    async addNewCustomer(customerID, customerEmail, contactEmail, personalizationObject, addresses, customerDatabase) {
        try{
            //create new Customer Object
            const newCustomerObject = new Customer(customerID, customerEmail, contactEmail, personalizationObject, addresses);
            
            //add new Customer Object to Database
            const res = await customerDatabase.addNewCustomerDB(newCustomerObject);

            //set customer id if necessary
            if (!customerID) {
                newCustomerObject.setCustomerNr(res.rows[0].cust_nr);
            }

            console.log("CustomerService return for addNewCustomer: " + newCustomerObject);
            return newCustomerObject;
        } catch(ex){
            console.log("Problem in class Customer-service in method addNewCustomer()");
        }
    }



    //method to get all customers from customer database
    async getAllCustomers() {
        try {
            // get all entries from db
            const allCustomers = await this.customerDatabase.getAllCustomersDB();

            const returnCustomerList = [];

            //create customer object for each entry and push it to list
            for (let i = 0; i < allCustomers.rows.length; i++) {
                var customerRow = allCustomers.rows[i];

                //create list of addresses for customer Obj creation
                const addresses = [
                    {
                        "name": customerRow.default_cust_name, 
                        "place": customerRow.default_place,
                        "postcode": customerRow.default_postcode,
                        "street": customerRow.default_street,
                        "streetNr": customerRow.default_streetnr,
                        "company": customerRow.default_company
                    }, 
                    {
                        "name": customerRow.shipping_cust_name, 
                        "place": customerRow.shipping_place,
                        "postcode": customerRow.shipping_postcode,
                        "street": customerRow.shipping_street,
                        "streetNr": customerRow.shipping_streetnr,
                        "company": customerRow.shipping_company
                    },
                    {
                        "name": customerRow.billing_cust_name, 
                        "place": customerRow.billing_place,
                        "postcode": customerRow.billing_postcode,
                        "street": customerRow.billing_street,
                        "streetNr": customerRow.billing_streetnr,
                        "company": customerRow.billing_company
                    }
                ]
                //create new customer Object
                const customerObj = new Customer(customerRow.cust_nr,customerRow.cust_email, customerRow.contact_email, customerRow.personal_obj, addresses); 

                returnCustomerList.push(customerObj);
            }
            return returnCustomerList;
        } catch (ex) {
            console.log("Problem in class Customer-service in method getAllCustomers()");
        }
    }


    
    //method to update specific material object in material database
    async updateCustomer(newCustomer) {
        try {
            //update entryto custoemr object in db
            const res = await this.customerDatabase.updateCustomerDB(newCustomer);
            return res;
        } catch(ex) {
            console.log("Problem in class Customer-service in method updateCustomer()");
        }
    }
}

module.exports = CustomerService;