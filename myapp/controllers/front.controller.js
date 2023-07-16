class FrontController {
    static async createIncident(req, res) {
    const catalogService = require("../services/catalog.service");
    const incidents = await catalogService.getAllIncidents();
    const categories = await catalogService.getAllCategories();
    return res.render("map", {
      incidents: incidents.data,
      categories: categories.data
    });
  }

  static async getAllIncidents(req, res) {
  const catalogService = require("../services/catalog.service");
  const incidents = await catalogService.getAllIncidents();
  return res.render("incidents", {
    incidents: incidents.data
    //user: req.datatoken,
  });
}

  static async uploadBanner(req, res) {
    const catalogService = require("../services/catalog.service");
    const incident = await catalogService.getByIdIncident(req.params.idincident);
    console.log("holaaaaaaa" , incident);
    return res.render("images", {
      incident: incident.data
      //user: req.datatoken,
    });

}







}



module.exports = FrontController;