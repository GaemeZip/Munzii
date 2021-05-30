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
.route('/font/updateFont')
.put(settingsController.updateFont)

router
.route('/theme/readTheme')
.get(settingsController.readTheme)

router
.route('/theme/currentTheme')
.get(settingsController.currentTheme)

router
.route('/theme/updateTheme')
.put(settingsController.updateTheme)

router
.route('/startDay/readStartDay')
.get(settingsController.readStartDay)

router
.route('/startDay/currentStartDay')
.get(settingsController.currentStartDay)

router
.route('/startDay/updateStartDay')
.put(settingsController.updateStartDay)

module.exports = router;