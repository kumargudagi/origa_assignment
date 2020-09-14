const ordersController = require('../controllers/ordersController');
const express = require("express");
const bodyParser = require('body-parser');
const orders = express.Router();
orders.use(bodyParser.json());


orders.route('/').post(ordersController.createOrder);
orders.route('/').get(ordersController.usersOrder);


module.exports = orders;