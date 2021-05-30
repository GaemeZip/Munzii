const express = require('express');
const settingsController = require('../controllers/settings.controller');

const router = express.Router();

router
.route('/font')
.get(settingsController.readFont)

module.exports = router;