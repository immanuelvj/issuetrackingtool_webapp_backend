const express = require('express');
const router = express.Router();
const appConfig = require("./../../config/appConfig");
const auth = require('./../middlewares/auth');
const issueController = require('../controllers/issueController');

let setRouter = (app) => {
    
    let baseUrl = `${appConfig.apiVersion}/issues`;
    
    app.post(`${baseUrl}/create`,issueController.createIssueFucntion)
    
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/issues api for create issue.
     *
     * @apiParam {string} issueName issueName of the Issue. (body params) (required)
     * @apiParam {string} issueStatus issueStatus of the Issue. (body params) (required)
     * @apiParam {string} issueDescription issueDesctiption of the Issue. (body params) (required)
     * @apiParam {string} ReportedId reportedId of the Issue. (body params) (required) 
     * @apiParam {string} AssigneeId Assignee of the Issue. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Successful",
            "status": 200,
            "data": {
                "issueDetails": {
                "issueName":"sdajkdsakad"    
                "issueStatus":Backlog,
                "issueDescription": "someone@mail.com",
                "issueReporterName": "Sengar",
                "issueAssigneeName": "Rishabh",
                "issueReporterId":"asdjkasdn",
                "issueAssigneeId":"asdjnads,"
                "issueId": "-E9zxTYA8"
            }

    
    */

    app.get(`${baseUrl}/viewByAssigneeId/:issueAssigneeId`,issueController.viewByAssigneeId)

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/issues/viewByAssigneeId/:issueAssigneeId api to view by assignee ID.
     *
     * @apiParam {string} issueAssigneeId issueAssigneeId of the Issue. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Successful",
            "status": 200,
            "data": {
                "issueDetails": {
                "issueName":"sdajkdsakad"    
                "issueStatus":Backlog,
                "issueDescription": "someone@mail.com",
                "issueReporterName": "Sengar",
                "issueAssigneeName": "Rishabh",
                "issueReporterId":"asdjkasdn",
                "issueAssigneeId":"asdjnads,"
                "issueId": "-E9zxTYA8"
            }

        }
    */
    app.get(`${baseUrl}/allIssue`,issueController.getAllIssue)
    
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/issues/all api to view all issue.
     *
     * * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Successful",
            "status": 200,
            "data": {
                "issueDetails": {
                "issueName":"sdajkdsakad"    
                "issueStatus":Backlog,
                "issueDescription": "someone@mail.com",
                "issueReporterName": "Sengar",
                "issueAssigneeName": "Rishabh",
                "issueReporterId":"asdjkasdn",
                "issueAssigneeId":"asdjnads,"
                "issueId": "-E9zxTYA8"
            }

        }
    */
    app.get(`${baseUrl}/view/:issueId`,issueController.viewByIssueId)

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/issues/view/:issueId api for issue view by ID.
     *
     * @apiParam {string} issueId issueId of the Issue. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Successful",
            "status": 200,
            "data": {
                "issueDetails": {
                "issueName":"sdajkdsakad"    
                "issueStatus":Backlog,
                "issueDescription": "someone@mail.com",
                "issueReporterName": "Sengar",
                "issueAssigneeName": "Rishabh",
                "issueReporterId":"asdjkasdn",
                "issueAssigneeId":"asdjnads,"
                "issueId": "-E9zxTYA8"
            }

        }
    */
    

    app.post(`${baseUrl}/delete`,issueController.deleteIssue)

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/issues/delete api for delete issue.
     *
     * @apiParam {string} issueAssigneeId issueAssigneeId of the Issue. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Successful",
            "status": 200,
            "data": {
                "issueDetails": {
                "issueName":"sdajkdsakad"    
                "issueStatus":Backlog,
                "issueDescription": "someone@mail.com",
                "issueReporterName": "Sengar",
                "issueAssigneeName": "Rishabh",
                "issueReporterId":"asdjkasdn",
                "issueAssigneeId":"asdjnads,"
                "issueId": "-E9zxTYA8"
            }

        }
    */
    app.put(`${baseUrl}/:issueId/edit`,issueController.editIssue)
    
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {put} /api/v1/issues/:issueId/edit api for edit Issue.
     *
     * @apiParam {string} issueAssigneeId issueAssigneeId of the Issue. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Successful",
            "status": 200,
            "data": {
                "issueDetails": {
                "issueName":"sdajkdsakad"    
                "issueStatus":Backlog,
                "issueDescription": "someone@mail.com",
                "issueReporterName": "Sengar",
                "issueAssigneeName": "Rishabh",
                "issueReporterId":"asdjkasdn",
                "issueAssigneeId":"asdjnads,"
                "issueId": "-E9zxTYA8"
            }

        }
    */
}

module.exports = {
    setRouter:setRouter
}