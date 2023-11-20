class CustomerDatabase {
    constructor(db) {
        this.pool = db.pool;
    }


    //method to get Customer with specific customerNr = id from db_customer
    async getCustomerById(id) {
        const query = {
            text: 'select * from db_customer where cust_nr = $1',
            values: [id],
        }
        const client = await this.pool.connect();
        const customerData = await client.query(query);
        client.release();

        console.log("Customer-database return for getCustomersById : " + JSON.stringify(customerData.rows));
        return customerData;
    }


    //method to get all customers from db_customer
    async getAllCustomersDB() {
        const query = {
            text: 'select * from db_customer',
        }
        const client = await this.pool.connect();
        const customerData = await client.query(query);
        client.release();

        console.log("Customer-database return for getAllCustomers : " + JSON.stringify(customerData.rows));
        return custoemrData;
    }

    //method to add new customer to db_customer
    async  addNewCustomerDB(customer) {
        const client = await this.pool.connect();
        const query = {
            //text: 'insert into db_customer(kd_name, personalng_obj, street, place, streetnr, email, passwd) values ($1, $2, $3, $4, $5, $6, crypt($7, gen_salt(\'md5\'))) returning kd_nr;',
            text: 'insert into db_customer(cust_nr, cust_name, personal_obj, street, place, streetnr, email, passwd, postcode) values ($1, $2, $3, $4, $5, $6, crypt($7, gen_salt(\'md5\')), $8) returning cust_nr;',
            values: [customer.customerNr, customer.customerName, JSON.stringify(customer.customerPersonalization), customer.customerAdrStreet, customer.customerAdrPlace, customer.customerAdrNr, customer.customerEmail, customer.customerPswd, customer.customerPostCode]
        }
        const res = client.query(query);
        client.release();

        console.log("Customer-database return for addNewCustomerDB : " + JSON.stringify(res));
        console.log("res: " + JSON.stringify(res.rows));
        return res;
    }
}

module.exports = CustomerDatabase;