const connectionDb = require("../config/dbconnectionpg");

module.exports = {
  async getAll() {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT * FROM categories"
        )
        .catch((err) => {
          console.error("MODEL CATEGORY: Can not get all categories", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows);
      return reject(null);
    });
  },
};