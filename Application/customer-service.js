const Customer = require("../Entities/Customer");

class CustomerService {

    //constructor for Service Object 
    //database connection is part of object
    constructor() {
    }

    //method to get customers from database for specific customerNr = id
    async getCustomerWithID(id, customerDatabase) {
        try {

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
            console.log("No customer found with ID = " + id);
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
            console.log("CustomerService return for addNewCustomer: " + newCustomerObject);
            return newCustomerObject;
        } catch(ex){
            console.log("Adding new Customer failed !\n");
        }
    }



    //method to get all materials from material database
    async getAllCustomers() {
        try {
            const res = await this.customerDatabase.getAllCustomersDB();
            return res;
        } catch (ex) {
            console.log("Getting all Customers failed !\n")
        }
    }


    
    //method to update specific material object in material database
    async updateCustomer(newCustomer) {
        try {
            const res = await this.customerDatabase.updateCustomerDB(newCustomer);
            return res;
        } catch(ex) {
            console.log("updating customer with kd_Nr = " + newCustomer.customerNr + " failed");
        }
    }
}

module.exports = CustomerService;