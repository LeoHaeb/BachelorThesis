class CustomerDatabase {
    constructor(db) {
        this.pool = db.pool;
    }


    //sql statement to get Customer with specific customerNr from db_customer
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


    //sql statement to get all customers from db_customer
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

    //sql statement to add new customer to db_customer
    async  addNewCustomerDB(customer) {
        const client = await this.pool.connect();
        const query = {
            //text: 'insert into db_customer(kd_name, personalng_obj, street, place, streetnr, email, passwd) values ($1, $2, $3, $4, $5, $6, crypt($7, gen_salt(\'md5\'))) returning kd_nr;',
            text: 'insert into db_customer(cust_nr, cust_name, personal_obj, street, place, streetnr, email, passwd, postcode) values ($1, $2, $3, $4, $5, $6, crypt($7, gen_salt(\'md5\')), $8) returning cust_nr;',
            //text: 'insert into db_customer (kd_name, personalng_obj, street, place, streetNr, email, passwd) values (\'Leo\', \'{"path": "www.bsp.de"}\', \'Hauptstr\', \'Albstadt\', \'4/1\', \'leo.haeberle@web.de\', \'1234\') returning kd_nr;',
            //text: 'select * from db_customer;',
            //text: 'insert into db_customer(reccycles, synthmattype, employee, manufacturer, size, date) values ($1, $2, $3, $4, $5, $6) returning matnr;',
            values: [customer.customerNr, customer.customerName, JSON.stringify(customer.customerPersonalization), customer.customerAdrStreet, customer.customerAdrPlace, customer.customerAdrNr, customer.customerEmail, customer.customerPswd, customer.customerPostCode]
        }
        const res = client.query(query);
        client.release();
        console.log("res: " + JSON.stringify(res.rows));
        return res;
    }

    

    //Function to update material database
    async updateMaterialDB(newMaterial) {
        //variable for counting number of arguments to pass to query $1, $2, ...
        var queryArgNr = 1;

        //array to store relevant attributes to update
        var arrayUpdateMatAttr = [];
        //array to store values for relevant attributes to update
        var arrayUpdateMatAttrVal = [];

        //loop to create arrays, every item is part of a sql query "attr = $x"
        Object.keys(newMaterial).forEach(matAttr => {
            if (newMaterial[matAttr] && matAttr != "matNr") {
                let updateMatAttrString = matAttr + " = $" + String(queryArgNr);
                arrayUpdateMatAttr.push(updateMatAttrString);
                arrayUpdateMatAttrVal.push(newMaterial[matAttr]);
                queryArgNr += 1;
            } 
        });
        
        //add attribute matNr to array, thos is ID of the database table
        arrayUpdateMatAttrVal.push(newMaterial["matNr"]);

        //sql update statement
        const query = {
            text: 'update db_material set ' + arrayUpdateMatAttr.toString() + ' where matNr = $' + String(queryArgNr),
            values: arrayUpdateMatAttrVal
        }
        const res = await this.db.query(query);
        console.log("res: " + JSON.stringify(res.rows));
        return res;
    }


}

module.exports = CustomerDatabase;