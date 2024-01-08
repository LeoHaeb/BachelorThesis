class LoginDatabase {
    constructor(db) {
        this.pool = db.pool;
    }

    //method to check if user exists
    async checkUser(userInfo) {
    
        const query = {
            text: 'select userid from db_authorization where username = $1 and passwd = $2',
            values: [userInfo.userName, userInfo.password],
        }
        const client = await this.pool.connect();
        const loginReturn = await client.query(query);
        client.release();

        console.log("login-database return for checkUser : " + JSON.stringify(loginReturn.rows));

        if (loginReturn.rows.length != 0) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = LoginDatabase;
