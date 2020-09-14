const usersController = require('../controllers/usersController');
const express = require("express");
const bodyParser = require('body-parser');
const users = express.Router();
users.use(bodyParser.json());


users.route('/').post(usersController.createUser);
users.route('/').put(usersController.userUpdate);


module.exports = users;