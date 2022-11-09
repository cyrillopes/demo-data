const express = require('express');
const viewsController = require('../controller/viewController');
const router = express.Router();

router.get('/', viewsController.getAllProductsPage);

module.exports = router;
