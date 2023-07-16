class CatalogController {
    static async gelAllCategories(req, res) {
      const catalogService = require("../services/catalog.service");
      const catalog = await catalogService.getAllCategories();
      return res.json(catalog).status(200);
    }
}
  
module.exports = CatalogController;