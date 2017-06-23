var express = require('express');
var uploadfileController = require('./uploadfile.controller');

var router = express.Router();

router.post('/', uploadfileController.index);

module.exports = router;
