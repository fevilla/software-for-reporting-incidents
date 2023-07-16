class UserController {
    static async signup(req, res) {
      const userService = require("../services/user.service");
      const profile = await userService.signup(req.body);
      return res.json(profile).status(200);
    }
    static async signin(req, res) {
      const userService = require("../services/user.service");
      const token = await userService.signin(req.body);
      return res.json(token).status(200);
    }  
    static async createIncident(req, res) {
      const userService = require("../services/user.service");
      console.log(req.body);
      const dataIncident = await userService.createIncident(req.body);
      return res.json(dataIncident).status(200);
    }
    static async getAllIncidents(req, res) {
      const catalogService = require("../services/catalog.service");
      const dataIncident = await catalogService.getAllIncidents();
      return res.json(dataIncident).status(200);
    }

    static async uploadBannerImage(req, res) {
      const userService = require("../services/user.service");
      if (!req.files || !req.files.file) res.redirect("/incident/" + req.params.idincident + "/image/upload?msg=err");
      const image = await userService.uploadBannerImage(req.params.idincident, req.files);
      return (image && image.status === 'ok') ? res.redirect("/incident/" + req.params.idincident + "/image/upload?msg=ok") : res.redirect("/incident/" + req.params.idincident + "/image/upload?msg=err")
    }

}
  
module.exports = UserController;