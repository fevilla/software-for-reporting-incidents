const { json } = require("express");

module.exports = {
  async getAllIncidents() {
    const incidentModel = require("../models/incident.model");
    const dataIncidents = await incidentModel
      .getAll()
      .catch((err) => {
        console.error("SERVICE USER - GET ALL INCIDENTS: Can not get all incident" , err);
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
  async getByIdIncident(idincident) {
    const incidentModel = require("../models/incident.model");
    const dataIncidents = await incidentModel
      .getById(idincident)
      .catch((err) => {
        console.error("SERVICE USER - GET ALL INCIDENTS: Can not get all incident" , err);
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
  async getAllCategories() {
    const categoryModel = require("../models/category.model");
    const categories = await categoryModel
      .getAll()
      .catch((err) => {
        console.error("SERVICE CATALOG - GETALLCATEGORIES: Can not get all");
        return null;
      })
    return (categories) ?
      {
        status: "ok",
        data: categories
      } : {
        status: "err",
        data: null
      }
  },
}