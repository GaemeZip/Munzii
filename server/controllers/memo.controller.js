const { memoService } = require('../services');

const createMemo = async (req, res, next) => {
    try {
        const date = req.body.date;
        const content = req.body.content;
        const userID = req.body.userID;

        if (!date || !content || !userID) {
            res.send('date / content / userID is required');
        }

        const memo = await memoService.createMemo(date,content,userID);
        res.send(memo);

    } catch (err) {
        next(err);
    }
}

const getMemo = async (req, res, next) => {
    try {
        const selectedDate = req.query.date;
        const userID = req.query.userID;

        if (!selectedDate || !userID) {
            res.send('selectedDate / userID is required');
        }

        const memo = await memoService.getMemo(selectedDate, userID);
        res.send(memo);

    } catch (err) {
        next(err);
    }
}

const updateMemo = async (req, res, next) => {
    try {
        const content = req.body.content;
        const date = req.body.date;
        const userID = req.body.userID;

        if (!content || !date || !userID) {
            res.send('content / date / userID is required');
        }

        const memo = await memoService.updateMemo(content, date, userID);
        res.send(memo);

    } catch (err) {
        next(err);
    }

}

const deleteMemo = async (req, res, next) => {
    try {
        const date = req.query.date;
        const userID = req.query.userID;

        if (!date || !userID) {
            res.send('date // userID is required');
        }

        const memo = await memoService.deleteMemo(date, userID);
        res.send(memo);

    } catch (err) {
        next(err);
    }
}

module.exports = {
    createMemo,
    getMemo,
    updateMemo,
    deleteMemo
}