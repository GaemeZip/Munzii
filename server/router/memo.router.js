const express = require('express');
const memoController = require('../controllers/memo.controller');

const router = express.Router();

router
.route('/')
.post(memoController.createMemo)
.get(memoController.getMemo)
.put(memoController.updateMemo)
.delete(memoController.deleteMemo)


module.exports = router;