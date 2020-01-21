const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const logger = require('./../libs/loggerLib');
const check = require('../libs/checkLib');
const response = require('../libs/responseLib');
const ImageModel = mongoose.model('Image')


let addImage = (req,res)=>{
    let newImage = new ImageModel({
        imageId:shortid.generate(),
        issueId:req.body.issueId,
        imageData:req.body.imageData,
        userName:req.body.userName
         })
    newImage.save((err,newIssue)=>{
        if(err){
            logger.error(err.messsage,'ImageController:Create Image',10)
            let apiResponse = response.generate(true,'Failed To add user',500,null)
            res.send(apiResponse.message)
        }
        else{
            let newIssueObj = newIssue.toObject();
            res.send(newIssueObj)
            console.log(newIssueObj)
        }
    })
}

let viewByIssueId = (req, res) => {

    if (check.isEmpty(req.params.issueId)) {

        console.log('IssueId should be passed')
        let apiResponse = response.generate(true, 'IssueId is missing', 403, null)
        res.send(apiResponse)
    } else {

        ImageModel.find({'issueId':req.params.issueId}, (err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Issue Not Found.')
                let apiResponse = response.generate(true, 'Image Not Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info("Issue found successfully","ImageController:ImageById",5)
                let apiResponse = response.generate(false, 'Image Found Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}

let deleteImage = (req, res) => {
    console.log(req.body.imageId)
        if (check.isEmpty(req.body.imageId)) {
    
            console.log('imageId should be passed')
            let apiResponse = response.generate(true, 'imageId is missing', 403, null)
            res.send(apiResponse)
        } else {
    
            ImageModel.remove({'imageId': req.body.imageId}, (err, result) => {
                if (err) {
                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                    res.send(apiResponse)
                } else if (check.isEmpty(result)) {
                    console.log('Issue Not Found.')
                    let apiResponse = response.generate(true, 'Image Not Found.', 404, null)
                    res.send(apiResponse)
                } else {
                    console.log('Image Deletion Success')
                    let apiResponse = response.generate(false, 'Image Deleted Successfully', 200, result)
                    res.send(apiResponse)
                }
            })
        }
    }
module.exports ={
    addImage:addImage,
    viewByIssueId:viewByIssueId,
    deleteImage:deleteImage
}