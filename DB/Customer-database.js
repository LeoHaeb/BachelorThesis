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

        if (customer.customerNr) {
            var query = {
                //text: 'insert into db_customer(kd_name, personalng_obj, street, place, streetnr, email, passwd) values ($1, $2, $3, $4, $5, $6, crypt($7, gen_salt(\'md5\'))) returning kd_nr;',
                text: 'insert into db_customer(cust_nr, cust_email, contact_email, personal_obj, default_cust_name, default_place, default_postcode, default_street, default_streetnr, default_company, shipping_cust_name, shipping_place, shipping_postcode, shipping_street, shipping_streetnr, shipping_company, billing_cust_name, billing_place, billing_postcode, billing_street, billing_streetnr, billing_company) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) returning cust_nr;',
                values: [customer.customerNr, customer.customerEmail, customer.contactEmail, JSON.stringify(customer.customerPersonalization), 
                            customer.customer_defaultAddress_name, customer.customer_defaultAddress_place, customer.customer_defaultAddress_postcode, customer.customer_defaultAddress_street, customer.customer_defaultAddress_streetNr, customer.customer_defaultAddress_company,
                                customer.customer_shippingAddress_name, customer.customer_shippingAddress_place, customer.customer_shippingAddress_postcode, customer.customer_shippingAddress_street, customer.customer_shippingAddress_streetNr, customer.customer_shippingAddress_company, 
                                    customer.customer_billingAddress_name, customer.customer_billingAddress_place, customer.customer_billingAddress_postcode, customer.customer_billingAddress_street, customer.customer_billingAddress_streetNr, customer.customer_billingAddress_company]
                                }
        } else {
            var query = {
                //text: 'insert into db_customer(kd_name, personalng_obj, street, place, streetnr, email, passwd) values ($1, $2, $3, $4, $5, $6, crypt($7, gen_salt(\'md5\'))) returning kd_nr;',
                text: 'insert into db_customer(cust_email, contact_email, personal_obj, default_cust_name, default_place, default_postcode, default_street, default_streetnr, default_company, shipping_cust_name, shipping_place, shipping_postcode, shipping_street, shipping_streetnr, shipping_company, billing_cust_name, billing_place, billing_postcode, billing_street, billing_streetnr, billing_company) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) returning cust_nr;',
                values: [customer.customerEmail, customer.contactEmail, JSON.stringify(customer.customerPersonalization), 
                            customer.customer_defaultAddress_name, customer.customer_defaultAddress_place, customer.customer_defaultAddress_postcode, customer.customer_defaultAddress_street, customer.customer_defaultAddress_streetNr, customer.customer_defaultAddress_company,
                                customer.customer_shippingAddress_name, customer.customer_shippingAddress_place, customer.customer_shippingAddress_postcode, customer.customer_shippingAddress_street, customer.customer_shippingAddress_streetNr, customer.customer_shippingAddress_company, 
                                    customer.customer_billingAddress_name, customer.customer_billingAddress_place, customer.customer_billingAddress_postcode, customer.customer_billingAddress_street, customer.customer_billingAddress_streetNr, customer.customer_billingAddress_company]
                        }
        }

        try {
            var res = await client.query(query);
            client.release();
        } catch(error) {
            console.log("error: " + error);
        }


        console.log("Customer-database return for addNewCustomerDB : " + JSON.stringify(res));
        console.log("res: " + JSON.stringify(res.rows));
        return res;
    }
}

module.exports = CustomerDatabase;
