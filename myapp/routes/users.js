var express = require('express');
var router = express.Router();


const UserController = require("../controllers/user.controller");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.post('/incidents/create', UserController.createIncident);
router.get('/incidents/getAll', UserController.getAllIncidents);
router.post('/incidents/:idincident/banner/upload', UserController.uploadBannerImage);



module.exports = router;
