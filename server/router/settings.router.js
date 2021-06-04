const express = require('express');
const settingsController = require('../controllers/settings.controller');
const router = express.Router();

// router
// .route('/fonts')
// .get(settingsController.getFonts)

// router
// .route('/fonts/:userId')
// .get(settingsController.getFontByUserId)
// .put()

router
.route('/font')
.get(settingsController.getFont)

router
.route('/font/:userID')
.get(settingsController.getFontByUserId)

router
.route('/font/:userID')
.put(settingsController.updateFont)

router
.route('/theme')
.get(settingsController.getTheme)

router
.route('/theme/:userID')
.get(settingsController.getThemeByUserId)

router
.route('/theme/:userID')
.put(settingsController.updateTheme)

router
.route('/startDay')
.get(settingsController.getStartDay)

router
.route('/startDay/:userID')
.get(settingsController.getStartDayByUserId)

router
.route('/startDay/:userID')
.put(settingsController.updateStartDay)

module.exports = router;