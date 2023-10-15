class MATDAO {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    async getAllMaterials() {
        const query = {
            text: 'select * from DB_Material'
        }
        const res = await dbConnection.query(query);
        return res;
    }
}