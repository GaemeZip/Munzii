const express = require('express');
const memoController = require('../controllers/memos.controller');

const router = express.Router();

router
.route('/')
.post(memoController.createMemo)
.get(memoController.readMemo)
.put(memoController.updateMemo)
.delete(memoController.deleteMemo)


module.exports = router;