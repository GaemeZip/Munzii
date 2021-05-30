const express = require('express');
const userController = require('../controllers/user.controller')

const router = express.Router();

router
.route('/join')
.post(userController.join)

router
.route('/login')
.get(userController.login)

router
.route('/checkUser')
.post(userController.checkUser)


module.exports = router;