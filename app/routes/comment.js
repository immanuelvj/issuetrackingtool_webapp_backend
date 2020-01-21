const express = require('express');
const router = express.Router();
const appConfig = require("./../../config/appConfig");
const auth = require('./../middlewares/auth');
const commentController = require('../controllers/commentController');

let setRouter = (app) =>{
    
    let baseUrl = `${appConfig.apiVersion}/comment`;
    app.post(`${baseUrl}/add`,commentController.addComment)
    
    app.get(`${baseUrl}/view/:issueId`,commentController.viewByIssueId)

    app.post(`${baseUrl}/delete`,commentController.deleteComment)
}


module.exports = {
    setRouter:setRouter
}