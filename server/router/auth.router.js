const express = require('express');
const router = express.Router();

router
.route('/join')
.post(authController.join)

