const express = require('express');
const progressController = require('../controllers/progress.controller')
const router = express.Router();

router
.route('/')
.post(progressController.createProgress)
.get(progressController.getProgress)
.put(progressController.updateProgress)

router
.route('/:date&userID')
.get(progressController.getProgressByUserId)


module.exports = router;