const { progressService } = require('../services');

const createProgress = async (req, res, next) => {
    try {
        const date = req.body.date;
        const userID = req.body.userID;

        const pg = await progressService.createProgress(date, userID);
        res.send(pg);

    } catch (err) {
        next(err);
    }
}

const getProgress = async (req, res, next) => {
    try {
        const year = req.query.year;
        const month = req.query.month;
        const userID = req.query.userID;

        const pg = await progressService.getProgress(year, month, userID);
        res.send(pg);

    } catch (err) {
        next(err);
    }
}

const updateProgress = async (req, res, next) => {
    try {
        const date = req.body.date;
        const progress = req.body.progress;
        const userID = req.body.userID;

        const pg = await progressService.updateProgress(progress, date, userID);
        res.send(pg);

    } catch (err) {
        next(err);
    }
}

const getProgressByUserId = async (req, res, next) => {
    
    try {
        const userID = req.params.userID;
        const date = req.query.date;

        const pg = await progressService.getProgressByUserId(date, userID);

        res.send(pg);

    } catch (err) {
        next(err);
    }
}

module.exports = {
    createProgress,
    getProgress,
    updateProgress,
    getProgressByUserId,
}