const express = require('express');
const router = express.Router();
const homepageController = require('./homepage.controller');

router.get('/', homepageController.homepage);

module.exports = router;