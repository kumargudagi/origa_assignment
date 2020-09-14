const defaultController = require('../controllers/defaultcontroller');
const express = require("express");
const bodyParser = require('body-parser');
const defaults = express.Router();
defaults.use(bodyParser.json());


defaults.route('/').get(defaultController.defaultApi);
defaults.route('/register').get(defaultController.register);



module.exports = defaults;