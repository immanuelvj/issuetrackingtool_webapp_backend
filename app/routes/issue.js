const express = require('express');
const router = express.Router();
const appConfig = require("./../../config/appConfig");
const auth = require('./../middlewares/auth');
const issueController = require('../controllers/issueController');

let setRouter = (app) => {
    
    let baseUrl = `${appConfig.apiVersion}/issues`;
    
    app.post(`${baseUrl}/create`,issueController.createIssueFucntion)
    
    app.get(`${baseUrl}/viewByAssigneeId/:issueAssigneeId`,issueController.viewByAssigneeId)

    app.get(`${baseUrl}/allIssue`,issueController.getAllIssue)
    
    app.get(`${baseUrl}/view/:issueId`,issueController.viewByIssueId)

    app.post(`${baseUrl}/delete`,issueController.deleteIssue)

    app.put(`${baseUrl}/:issueId/edit`,issueController.editIssue)
}

module.exports = {
    setRouter:setRouter
}