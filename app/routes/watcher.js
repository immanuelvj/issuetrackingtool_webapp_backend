const express = require('express');
const router = express.Router();
const appConfig = require("./../../config/appConfig");
const auth = require('./../middlewares/auth');
const watcherController = require('../controllers/watcherController');

let setRouter = (app) =>{
    
    let baseUrl = `${appConfig.apiVersion}/watcher`;
    app.post(`${baseUrl}/add`,watcherController.addWatcher)
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/watcher api for create watcher.
     *
     * @apiParam {string} issueId issueId of the image. (body params) (required)
     * @apiParam {string} userId userId of the image. (body params) (required)
     * @apiParam {string} userName userName of the image. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Successful",
            "status": 200,
            "data": {
                "ImageDetails": {
                "issueId":"sdajkdsakad"    
                "userName": "Sengar",
                "userId":"asdjkasdn",
                "watcherId": "-E9zxTYA8"
            }

    
    */

    
    app.get(`${baseUrl}/view/:issueId`,watcherController.viewByIssueId)
/**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/watcher api for view watcher.
     *
     * @apiParam {string} issueId issueId of the image. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Successful",
            "status": 200,
            "data": {
                "ImageDetails": {
                "issueId":"sdajkdsakad"    
                "userName": "Sengar",
                "userId":"asdjkasdn",
                "watcherId": "-E9zxTYA8"
            }

    
    */
    app.post(`${baseUrl}/delete`,watcherController.deleteWatcher)
/**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/watcher api for create watcher.
     *
     * @apiParam {string} watcjerId watcherId of the watcher. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Successful",
            "status": 200,
            "data": {
                "ImageDetails": {
                "issueId":"sdajkdsakad"    
                "userName": "Sengar",
                "userId":"asdjkasdn",
                "watcherId": "-E9zxTYA8"
            }

    
    */
}


module.exports = {
    setRouter:setRouter
}