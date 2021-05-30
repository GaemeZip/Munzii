const express = require('express');
const settingsController = require('../controllers/settings.controller');

const router = express.Router();

router
.route('/font/readFont')
.get(settingsController.readFont)

router
.route('/font/currentFont')
.get(settingsController.currentFont)

router
.route('/theme/readTheme')
.get(settingsController.readTheme)

router
.route('/theme/currentTheme')
.get(settingsController.currentTheme)

router
.route('/startDay/readStartDay')
.get(settingsController.readTheme)

router
.route('/startDay/currentStartDay')
.get(settingsController.currentTheme)

module.exports = router;