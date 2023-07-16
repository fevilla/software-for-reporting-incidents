var express = require('express');
var router = express.Router();

const CatalogController = require("../controllers/catalog.controller");
const FrontController = require("../controllers/front.controller");
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/incident/create", FrontController.createIncident);
router.get("/incident/getAll", FrontController.getAllIncidents);
router.get("/incident/:idincident/image/upload" , FrontController.uploadBanner)

router.get('/mapi', async function(req, res, next) {
  res.render('map', { title: 'Express' });
});


router.get('/category/getAll', CatalogController.gelAllCategories);


router.get('/login', async function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/register', async function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.get('/front', async function(req, res, next) {
  res.render('front', { title: 'Register' });
});


router.get('/images', async function(req, res, next) {
  res.render('images', { title: 'Register' });
});


router.get('/prueba', async function(req, res, next) {
  res.render('prueba', { title: 'prueba' });
});








module.exports = router;