const express = require('express');
const router = express.Router();
const appConfig = require("./../../config/appConfig");
const auth = require('./../middlewares/auth');
const notificationController = require('../controllers/notificationController');

let setRouter = (app) =>{
    
    let baseUrl = `${appConfig.apiVersion}/notification`;
    
    app.get(`${baseUrl}/view/:userId`,notificationController.viewByUserId)

}


module.exports = {
    setRouter:setRouter
}