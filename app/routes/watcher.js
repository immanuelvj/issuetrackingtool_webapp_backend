const express = require('express');
const router = express.Router();
const appConfig = require("./../../config/appConfig");
const auth = require('./../middlewares/auth');
const watcherController = require('../controllers/watcherController');

let setRouter = (app) =>{
    
    let baseUrl = `${appConfig.apiVersion}/watcher`;
    app.post(`${baseUrl}/add`,watcherController.addWatcher)
    
    app.get(`${baseUrl}/view/:issueId`,watcherController.viewByIssueId)

    app.post(`${baseUrl}/delete`,watcherController.deleteWatcher)

}


module.exports = {
    setRouter:setRouter
}