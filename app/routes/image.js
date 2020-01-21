const express = require('express');
const router = express.Router();
const appConfig = require("./../../config/appConfig");
const auth = require('./../middlewares/auth');
const imageController = require('../controllers/imageController');

let setRouter = (app) =>{
    
    let baseUrl = `${appConfig.apiVersion}/image`;
    app.post(`${baseUrl}/add`,imageController.addImage)
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/image api for create image.
     *
     * @apiParam {string} issueId issueId of the image. (body params) (required)
     * @apiParam {string} userId userId of the image. (body params) (required)
     * @apiParam {string} userName userName of the image. (body params) (required)
     * @apiParam {string} imageData imageData of the image. (body params) (required) 
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
                "imageData":"asdjnads,"
                "imageId": "-E9zxTYA8"
            }

    
    */

    app.get(`${baseUrl}/view/:issueId`,imageController.viewByIssueId)
/**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/image api for view image.
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
                "imageData":"asdjnads,"
                "imageId": "-E9zxTYA8"
            }

    
    */

    app.post(`${baseUrl}/delete`,imageController.deleteImage)
/**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/image api for create image.
     *
     * @apiParam {string} imageId imageId of the image. (body params) (required)
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
                "imageData":"asdjnads,"
                "imageId": "-E9zxTYA8"
            }

    
    */

}


module.exports = {
    setRouter:setRouter
}