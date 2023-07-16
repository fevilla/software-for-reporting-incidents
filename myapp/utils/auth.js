const jwt = require("jsonwebtoken");
const configtoken = require("../config/token");
const moment = require("moment");
const { customAlphabet } = require('nanoid');
const keypass = 30; //cuantos digitos aumentar al token

module.exports = {
  newTokenUser: async function (user, infouser) {
    const payload = {
      idprofile: user.idprofile,
      emailprofile: user.email,
      fullname: infouser.names + " " + infouser.surnames,
      exp: moment().add(180, "days").unix(),
    };
    return jwt.sign(payload, configtoken.TOKEN_SECRET_USER);
  },

  newTokenAdmin: async function (admin) {
    const payload = {
      idAdmin: admin.idloginadmin,
      emailprofile: admin.email,
      fullname: admin.names,
      exp: moment().add(180, "days").unix(),
    };
    return jwt.sign(payload, configtoken.TOKEN_SECRET_ADMIN);
  },

  newKeyUser: async function (user) {
    const payload = {
      idprofile: user.idprofile,
      email: user.email,
      fullname: user.names + " " + user.surnames
    };
    const tk = jwt.sign(payload, configtoken.VERIFYEMAIL_SECRET_USER);
    const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ$abcdefghijklmnopqrstu", keypass);
    return nanoid() + Buffer.from(tk).toString('base64');
  },

  keyDecoded: async function (key) {
    key = key.substring(keypass, key.lenght);
    const text = Buffer.from(key, 'base64').toString('ascii')
    return jwt.verify(
      text,
      configtoken.VERIFYEMAIL_SECRET_USER,
      async (err, decoded) => {
        if (err) {
          console.log("Error for validating user token", err.name);
          return null;
        } else {
          return decoded;
        }
      }
    );
  },


  comparePassword: async function (password, passwordhash) {
    const bcrypt = require("bcryptjs");
    return new Promise(async (resolve, reject) => {
      bcrypt.compare(password, passwordhash, (err, same) => {
        if (err) return reject(err);
        return resolve(same);
      });
    });
  },

  authenticateFront: async function (req, res, next) {
    let tokenBrowser =
      req.body.token ||
      req.query.token ||
      req.headers["authorization"] ||
      req.cookies.dsu;

    if (!tokenBrowser) {
      req.datatoken = null;
      return next();
    }

    const JWT = require("jsonwebtoken");
    const configToken = require("../config/token");
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined")
      tokenBrowser = bearerHeader.split(" ")[1];

    JWT.verify(
      tokenBrowser,
      configToken.TOKEN_SECRET_USER,
      async (err, decoded) => {
        if (err) {
          console.log("Error for validating user token", err.name);
          req.datatoken = null;
          return next();
        } else {
          req.datatoken = decoded;
          return next();
        }
      }
    );
  },

  authenticateDash: async function (req, res, next) {
    let tokenBrowser =
      req.body.token ||
      req.query.token ||
      req.headers["authorization"] ||
      req.cookies.dsu;

    if (!tokenBrowser) {
      req.datatoken = null;
      return res.redirect("/");
    }

    const JWT = require("jsonwebtoken");
    const configToken = require("../config/token");
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined")
      tokenBrowser = bearerHeader.split(" ")[1];

    JWT.verify(
      tokenBrowser,
      configToken.TOKEN_SECRET_USER,
      async (err, decoded) => {
        if (err) {
          console.error("Error for validating user token", err.name);
          return res.redirect("/");
        } else {
          req.datatoken = decoded;
          return next();
        }
      }
    );
  },

  authenticateUser: async function (req, res, next) {
    console.log("req.cookies",req.cookies)
    let tokenBrowser =
      req.body.token ||
      req.query.token ||
      req.headers["authorization"] ||
      req.cookies.token ||
      req.cookies.dsu;

    if (!tokenBrowser)
      return res.status(403).json({
        status: "error",
        msg: "Do not provide your token",
        data: null,
      });

    const JWT = require("jsonwebtoken");
    const configToken = require("../config/token");
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined")
      tokenBrowser = bearerHeader.split(" ")[1];

    JWT.verify(
      tokenBrowser,
      configToken.TOKEN_SECRET_USER,
      async (err, decoded) => {
        if (err) {
          console.log("Error for validating user token", err.name);
          res.json({
            status: "error",
            msg: "Token invalid",
            data: null,
          });
        } else {
          req.datatoken = decoded;
          return next();
        }
      }
    );
  },

  authenticateAdmin: async function (req, res, next) {
    let tokenBrowser =
      req.body.token ||
      req.query.token ||
      req.headers["authorization"] ||
      req.cookies.dsa;

    if (!tokenBrowser) return res.redirect("/panel");

    const JWT = require("jsonwebtoken");
    const configToken = require("../config/token");
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined")
      tokenBrowser = bearerHeader.split(" ")[1];

    JWT.verify(
      tokenBrowser,
      configToken.TOKEN_SECRET_ADMIN,
      async (err, decoded) => {
        if (err) {
          console.log("Error for validating user token", err.name);
          return res.redirect("/panel");
        } else {
          req.datatoken = decoded;
          return next();
        }
      }
    );
  },
};