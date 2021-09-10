var express = require('express');
var router = express.Router();
var index = require('../controller/index.controller');
var authenticate = require('../routes/auth');


/* GET home page. */
router.get('/', index.home);
router.get('/about', authenticate.User, index.about);
router.get(`/profile`, authenticate.User, index.profile);


module.exports = router;
