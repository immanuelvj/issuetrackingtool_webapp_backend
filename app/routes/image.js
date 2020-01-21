const express = require('express');
const router = express.Router();
const appConfig = require("./../../config/appConfig");
const auth = require('./../middlewares/auth');
const imageController = require('../controllers/imageController');

let setRouter = (app) =>{
    
    let baseUrl = `${appConfig.apiVersion}/image`;
    app.post(`${baseUrl}/add`,imageController.addImage)
    
    app.get(`${baseUrl}/view/:issueId`,imageController.viewByIssueId)

    app.post(`${baseUrl}/delete`,imageController.deleteImage)

}


module.exports = {
    setRouter:setRouter
}