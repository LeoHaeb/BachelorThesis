class CustomerService {

    //constructor for Service Object 
    //database connection is part of object
    constructor(customerDatabase) {
        this.customerDatabase = customerDatabase;
    }

    //method to get customers from database for specific customerNr = id
    async getCustomerWithID(id) {
        try {
            const customer = await this.customerDatabase.getCustomerById(id);
            return customer;
        }
        catch(ex) {
            console.log("No customer found with ID = " + id);
        }
    }

    //method for adding new customer object to customer database
    async addNewCustomer(customer) {
        try{
            const res = await this.customerDatabase.addNewCustomerDB(customer);
            return res;
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