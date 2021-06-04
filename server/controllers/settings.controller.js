const mysql = require('mysql');
const dbconfig = require('../config/db');
const connection = mysql.createConnection(dbconfig);
const { settingService } = require('../services')

const readFont = async (req, res, next) => {
    try {
        const fontList = await settingService.readFont();
        res.send(fontList);
    } catch (err) {
        next(err);
    }
}

const currentFont = async (req, res, next) => {
    try {
        const u_id = req.query.userID;

        const currentFont = await settingService.currentFont(u_id);
        res.send(currentFont);
    } catch (err) {
        next(err);
    }
}

const updateFont = async (req, res, next) => {
    try {
        const font_id = req.body.font_id;
        const u_id = req.body.userID;

        const updateFont = await settingService.updateFont(font_id, u_id);
        res.send(updateFont);
    } catch (err) {
        next(err);
    }
}

const readTheme = async (req, res, next) => {
    try {
        const themeList = await settingService.readTheme();
        res.send(themeList);
    } catch (err) {
        next(err);
    }
}

const currentTheme = async (req, res, next) => {
    try {
        const u_id = req.query.userID;

        const currentTheme = await settingService.currentTheme(u_id);
        res.send(currentTheme);
    } catch (err) {
        next(err);
    }
}

const updateTheme = async (req, res, next) => {
    try {
        const theme_id = req.body.theme_id;
        const u_id = req.body.userID;

        const updateTheme = await settingService.updateTheme(theme_id, u_id);
        res.send(updateTheme);
    } catch (err) {
        next(err);
    }
}

const readStartDay = async (req, res, next) => {
    try {
        const startDayList = await settingService.readStartDay();
        res.send(startDayList);
    } catch (err) {
        next(err);
    }
}

const currentStartDay = async (req, res, next) => {
    try {
        const u_id = req.query.userID;

        const currentStartDay = await settingService.currentStartDay(u_id);
        res.send(currentStartDay);
    } catch (err) {
        next(err);
    }
}

const updateStartDay = async (req, res, next) => {
    try {
        const start_day_id = req.body.start_day_id;
        const u_id = req.body.userID;

        const updateStartDay = await settingService.updateStartDay(start_day_id, u_id);
        res.send(updateStartDay);
    } catch (err) {
        next(err);
    }
}



module.exports = {
    readFont,
    currentFont,
    updateFont,
    readTheme,
    currentTheme,
    updateTheme,
    readStartDay,
    currentStartDay,
    updateStartDay
}