const { json } = require("express");

module.exports = {
  async signup(dto) {
    const loginModel = require('../models/loginuser.model');
    const profileModel = require('../models/profile.model');

    if (!dto.password || !dto.email || !dto.dni || !dto.mobile || !dto.names || !dto.surnames) return {
      status: "err",
      msg: "Asegurese de llenar todos los campos",
      data: null
    };

    dto.dateregister = new Date();
    const profile = await profileModel.create(dto).catch((err) => {
      console.error("USER SERVICE - SIGNUP: Can not get profile");
      return { error: err };
    });

    if (!profile) return {
      status: "err",
      msg: "No se inserto su registro",
      data: null
    }

    if (profile && profile.error) return {
      status: "err",
      msg: profile.error,
      data: null
    };

    const login = await loginModel.create(dto, profile.idprofile).catch((err) => {
      console.error("USER SERVICE - SIGNUP: Can not create login" ,err);
      return null;
    })

    return (login) ? {
      status: "ok",
      msg: "Se registro con éxito",
      data: profile
    } : {
      status: "err",
      msg: "Error al registrarse",
      data: null
    }
  }, 
  
  async signin({ email, password }) {
    const loginModel = require("../models/loginuser.model");
    const profileModel = require("../models/profile.model");
    const auth = require("../utils/auth")
    const login = await loginModel
      .getByEmail(email)
      .catch((err) => {
        console.error("SERVICE USER - SIGNIN: Can not get login by email" , err);
        return null;
      })

    if (login && login.idprofile) {
      const profile = await profileModel.getById(login.idprofile)
        .catch((err) => {
          console.error("SERVICE USER - SIGNIN: No exite profile" , err)
        })

      if (profile) {
        const ok = await auth.comparePassword(password, login.password)
          .catch((err) => {
            console.error("SERVICE USER - SIGNIN: Incorrect password", err);
            return null;
          });

        if (ok) {
          const datatoken = await auth.newTokenUser(login, profile);
          return (datatoken) ? {
            status: "ok",
            msg: "Autentificación exitosa",
            data: {
              token: datatoken,
              num: login.idprofile
            }
          } : {
            status: "err",
            msg: "Error al generar token",
            data: null
          }
        }
        return {
          status: "err",
          msg: "Contraseña incorrecta",
          data: null
        }
      } else return {
        status: "err",
        msg: "No existe el perfil",
        data: null
      }
    }
    return {
      status: "err",
      msg: "email incorrecto",
      data: null
    }
  },

  async uploadBannerImage(idincident, files) {
    const incidentModel = require("../models/incident.model");
    const imageUtils = require("../utils/images");

    const incident = await incidentModel.getBanner(idincident).catch((err) => {
      console.error("SERVICE ADMIN - UPLOADBANNERIMAGE: Can not get banner from BD", err);
      return null;
    });

    if (!incident) return {
      status: "err",
      msg: "No existe el incidente",
      data: incident
    }

    if (incident.banner) {
      const dataDeleted = await imageUtils.delete(incident.banner).catch((err) => {
        console.error("SERVICE ADMIN - UPLOADBANNERIMAGE: can not delete banner from BD", err);
        return null;
      })
      if (!dataDeleted) console.error("SERVICE ADMIN - UPLOADBANNERIMAGE: No se eliminó la imagen from BD");
    }

    const dataUploaded = await imageUtils.upload(files).catch((err) => {
      console.error("SERVICE ADMIN - UPLOADBANNERIMAGE: Can not upload image al Servidor", err);
      return null;
    })

    console.log(dataUploaded);
    if (dataUploaded) {
      const incidentUpdated = await incidentModel.updateBanner(idincident, dataUploaded).catch((err) => {
        console.error("SERVICE ADMIN - UPLOADBANNERIMAGE: Can not update data banner incident", err);
        return null;
      })
      if (incidentUpdated) return {
        status: "ok",
        msg: "Se subió con éxito la imagen",
        data: incidentUpdated
      }
    }
    return {
      status: "err",
      msg: "No se subió la imagen",
      data: null
    }
  },



  async createIncident(dto) {
    console.log("incident" , dto);
    const date = new Date();
    const incidentModel = require("../models/incident.model");
    const dataIncidents = await incidentModel
      .create(dto , date)
      .catch((err) => {
        console.error("SERVICE USER - CREATE INCIDENT: Can not create incident", err);
        return null;
      })
    return (dataIncidents) ?
      {
        status: "ok",
        data: dataIncidents
      } : {
        status: "err",
        data: null
      }
  },

  
}