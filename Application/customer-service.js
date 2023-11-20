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

            //create new Custoemr Object with information from database 
            const customerReturnObject = new Customer(customerRow.cust_nr, customerRow.cust_name, customerRow.street, 
                                                        customerRow.place, customerRow.postcode, customerRow.streetnr, 
                                                            customerRow.personal_obj, customerRow.email, customerRow.passwd); 

            console.log("CustomerService return for getCustomerWithID(id = " + id + "): " + customerReturnObject);
            return customerReturnObject;
        }
        catch(ex) {
            console.log("Problem in class Customer-service in method getCustomerWithID(" + id + ")");
        }
    }


    
    //method for adding new customer object to customer database
    async addNewCustomer(customer, customerDatabase) {
        try{
            //create new Customer Object
            const newCustomerObject = new Customer(customer.customerNr, customer.customerName, customer.customerAdrStreet, 
                customer.customerAdrPlace, customer.customerPostCode, customer.customerAdrNr, customer.customerPersonalization,
                customer.customerEmail, customer.customerPswd);
            
            //add new Customer Object to Database
            const res = await customerDatabase.addNewCustomerDB(customer);

            //change customerNr from new customer Object
            newCustomerObject.setCustomerNr(res.rows[0]);

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
                var customerObj = new Customer(customerRow.cust_nr,customerRow.cust_name, customerRow.street, 
                                                customerRow.place, customerRow.postcode, customerRow.streetnr, 
                                                    customerRow.personal_obj, customerRow.email, customerRow.passwd );
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