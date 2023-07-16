const connectionDb = require("../config/dbconnectionpg");


module.exports = {
  /*this function gets all categories including subcategories*/
  async create({ email, password }, idprofile) {
    const bcrypt = require("bcryptjs");
    const passwordHash = bcrypt.hashSync(password, 8);
    console.log(email);
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const login = await connection
        .query(
          "INSERT INTO loginuser(email , password , idprofile) values ($1,$2,$3) RETURNING*",
          [
            email,
            passwordHash,
            idprofile
          ]
        ).catch((err) => {
          console.error("MODEL LOGIN USER: Can not insert", err);
          return err;
        });
      connection.end();
      if (login && login.rows && login.rows.length > 0)
        return resolve(login.rows[0]);
      return reject(login);
    })
  },


  async getByEmail(email) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const login = await connection
        .query(
          "SELECT * FROM loginuser WHERE email = $1", [email]
        ).catch((err) => {
          console.error("MODEL LOGIN USER: Can not get by email", err);
          return err;
        });
      connection.end();
      if (login && login.rows && login.rows.length > 0)
        return resolve(login.rows[0]);
      return reject(null);
    })
  },


  /*this function gets all categories including subcategories*/
  async updatePassword(passwordnew, idlogin) {
    const bcrypt = require("bcryptjs");
    const passwordHash = bcrypt.hashSync(passwordnew, 8);
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const login = await connection
        .query(
          "UPDATE loginuser SET password = $1 WHERE idlogin = $2 RETURNING*",
          [
            passwordHash,
            idlogin
          ]
        ).catch((err) => {
          console.error("MODEL LOGIN USER: Can not update password", err);
          return err;
        });
      connection.end();
      if (login && login.rows && login.rows.length > 0)
        return resolve(login.rows[0]);
      return reject(null);
    })
  },


  async getByIdprofile(id) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const login = await connection
        .query(
          "SELECT * FROM loginuser WHERE idprofile = $1", [id]
        ).catch((err) => {
          console.error("MODEL LOGIN USER: Can not get by id", err);
          return err;
        });
      connection.end();
      if (login && login.rows && login.rows.length > 0)
        return resolve(login.rows[0]);
      return reject(null);
    })
  },


  async delete(idprofile) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const login = await connection
        .query(
          "DELETE FROM loginuser WHERE idprofile = $1 RETURNING *", [idprofile]
        ).catch((err) => {
          console.error("MODEL LOGIN USER: Can not delete", err);
          return err;
        });
      connection.end();
      if (login && login.rows && login.rows.length > 0)
        return resolve(login.rows[0]);
      return reject(null);
    })
  }
}