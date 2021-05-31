const express = require('express');
const authController = require('../controllers/auth.controller')

const router = express.Router();

router
.route('/join')
.post(authController.join)

router
.route('/login')
.post(authController.login)

router
.route('/checkUser')
.post(authController.checkUser)


module.exports = router;