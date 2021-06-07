const mysql = require('mysql');
const dbconfig = require('../config/db');
const connection = mysql.createConnection(dbconfig);
const { settingService } = require('../services')

const getFont = async (req, res, next) => {
    try {
        const fontList = await settingService.getFont();
        res.send(fontList);
    } catch (err) {
        next(err);
    }
}

const getFontByUserId = async (req, res, next) => {
    try {
        const u_id = req.params.userID;

        const getFontByUserId = await settingService.getFontByUserId(u_id);
        res.send(getFontByUserId);
    } catch (err) {
        next(err);
    }
}

const updateFont = async (req, res, next) => {
    try {
        const font_id = req.body.font_id;
        const u_id = req.params.userID;

        const updateFont = await settingService.updateFont(font_id, u_id);
        res.send(updateFont);
    } catch (err) {
        next(err);
    }
}

const getTheme = async (req, res, next) => {
    try {
        const themeList = await settingService.getTheme();
        res.send(themeList);
    } catch (err) {
        next(err);
    }
}

const getThemeByUserId = async (req, res, next) => {
    try {
        const u_id = req.params.userID;

        const getThemeByUserId = await settingService.getThemeByUserId(u_id);
        res.send(getThemeByUserId);
    } catch (err) {
        next(err);
    }
}

const updateTheme = async (req, res, next) => {
    try {
        const theme_id = req.body.theme_id;
        const u_id = req.params.userID;

        const updateTheme = await settingService.updateTheme(theme_id, u_id);
        res.send(updateTheme);
    } catch (err) {
        next(err);
    }
}

const getStartDay = async (req, res, next) => {
    try {
        const startDayList = await settingService.getStartDay();
        res.send(startDayList);
    } catch (err) {
        next(err);
    }
}

const getStartDayByUserId = async (req, res, next) => {
    try {
        const u_id = req.params.userID;

        const getStartDayByUserId = await settingService.getStartDayByUserId(u_id);
        res.send(getStartDayByUserId);
    } catch (err) {
        next(err);
    }
}

const updateStartDay = async (req, res, next) => {
    try {
        const start_day_id = req.body.start_day_id;
        const u_id = req.params.userID;

        const updateStartDay = await settingService.updateStartDay(start_day_id, u_id);
        res.send(updateStartDay);
    } catch (err) {
        next(err);
    }
}



module.exports = {
    getFont,
    getFontByUserId,
    updateFont,
    getTheme,
    getThemeByUserId,
    updateTheme,
    getStartDay,
    getStartDayByUserId,
    updateStartDay
}