const connectionDb = require("../config/dbconnectionpg");

module.exports = {
  async create({idprofile, idcategory, title, description, ubication , state , latitud , longitud} , date) {
    return new Promise(async (resolve, reject) => {
      console.log(typeof(position))
      const connection = connectionDb();
      const data = await connection
        .query(
          "INSERT INTO incidents (idprofile, idcategory, title, description, ubication , date, state , latitud , longitud) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *", [idprofile, idcategory, title, description, ubication , date, state , latitud , longitud]
        )
        .catch((err) => {
          console.error("MODEL INCIDENT: Can not create", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },

  async updateBanner(idincident , banner) {
    return new Promise(async (resolve, reject) => {
      console.log(typeof(position))
      const connection = connectionDb();
      const data = await connection
        .query(
          "UPDATE incidents SET banner = $1 where idincident = $2 RETURNING *", [banner , idincident]
        )
        .catch((err) => {
          console.error("MODEL INCIDENT: Can not create", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },


  async getAll() {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT  banner , idincident , idprofile , c.idcategory , title , description , ubication , date , state, latitud , longitud , name as namecategory FROM incidents i JOIN categories c on c.idcategory = i.idcategory"
        )
        .catch((err) => {
          console.error("MODEL INCIDENT: can not get all", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows);
      return reject(null);
    });
  },

  async getById(idincident) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT * FROM incidents where idincident = $1 " , [idincident]
        )
        .catch((err) => {
          console.error("MODEL INCIDENT: can not get by id", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },

  async getBanner(idincident) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT banner FROM incidents where idincident = $1" , [idincident]
        )
        .catch((err) => {
          console.error("MODEL INCIDENT: can not get all", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows);
      return reject(null);
    });
  },
 
};