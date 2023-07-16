const connectionDb = require("../config/dbconnectionpg");

module.exports = {
  /*this function gets all categories including subcategories*/
  async create({ names, surnames, dni, mobile, email, dateregister}) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const profile = await connection
        .query(
          "INSERT INTO profiles(names , surnames , dni , mobile , email , dateregister , datedelete, visible) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING*",
          [
            names,
            surnames,
            dni,
            mobile,
            email,
            dateregister,
            null,
            true
          ]
        ).catch((err) => {
          console.log(err);
          console.error("MODEL USER: Can not insert", err);
          if (err.code && err.code == '23505' && err.detail) {
            if (err.detail.search('dni') != -1) return 'El dni ingresado ya esta vinculado a otra cuenta';
            if (err.detail.search('mobile') != -1) return 'El número de celular ingresado ya esta vinculado a otra cuenta'
            return 'El email ingresado ya ha sido registrado';
          }
          else return 'Error al registrarse';
        });
      connection.end();
      if (profile && profile.rows && profile.rows.length > 0)
        return resolve(profile.rows[0]);
      if (profile && profile.rows)
        return resolve(null);
      return reject(profile);
    })
  },

  async getById(idprofile) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const profile = await connection
        .query(
          "SELECT * FROM profiles WHERE visible = true AND idprofile = $1", [idprofile]
        ).catch((err) => {
          console.error("MODEL USER: Can not get by id", err);
          return null;
        });
      connection.end();
      if (profile && profile.rows && profile.rows.length > 0)
        return resolve(profile.rows[0]);
      return reject(null);
    })
  },
};
