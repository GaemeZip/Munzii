const express = require('express');

const router = express.Router();

router
.route('/join')
.post(userController.join)


router
.route('/login')
.post(userController.login)

router
.route('/checkUser')
.post(userController.checkUser)


module.exports = router;