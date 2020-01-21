const express = require('express');
const router = express.Router();
const appConfig = require("./../../config/appConfig");
const auth = require('./../middlewares/auth');
const commentController = require('../controllers/commentController');

let setRouter = (app) =>{
    
    let baseUrl = `${appConfig.apiVersion}/comment`;
    app.post(`${baseUrl}/add`,commentController.addComment)
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/comment api for create comment.
     *
     * @apiParam {string} issueId issueId of the Comment. (body params) (required)
     * @apiParam {string} userId userId of the Comment. (body params) (required)
     * @apiParam {string} userName userName of the Comment. (body params) (required)
     * @apiParam {string} message message of the Comment. (body params) (required) 
      * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Successful",
            "status": 200,
            "data": {
                "CommentDetails": {
                "issueId":"sdajkdsakad"    
                "userName": "Sengar",
                "userId":"asdjkasdn",
                "message":"asdjnads,"
                "commentId": "-E9zxTYA8"
            }

    
    */

    
    app.get(`${baseUrl}/view/:issueId`,commentController.viewByIssueId)
/**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/comment api for view comment by issueID.
     *
     * @apiParam {string} issueId issueId of the Comment. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Successful",
            "status": 200,
            "data": {
                "CommentDetails": {
                "issueId":"sdajkdsakad"    
                "userName": "Sengar",
                "userId":"asdjkasdn",
                "message":"asdjnads,"
                "commentId": "-E9zxTYA8"
            }

    
    */

    app.post(`${baseUrl}/delete`,commentController.deleteComment)
            /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/comment api for delete comment.
     *
     * @apiParam {string} CommentId commentId of the Comment. (body params) (required)
      * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Successful",
            "status": 200,
            "data": {
                "CommentDetails": {
                "issueId":"sdajkdsakad"    
                "userName": "Sengar",
                "userId":"asdjkasdn",
                "message":"asdjnads,"
                "commentId": "-E9zxTYA8"
            }

    
    */

}


module.exports = {
    setRouter:setRouter
}