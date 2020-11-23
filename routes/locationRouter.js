const express = require('express');
const router = express.Router();

const locationController = require('../controllers/locationController');

router.get('/', locationController.getStatsForLocation);

module.exports = router;