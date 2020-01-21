const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const logger = require('./../libs/loggerLib');
const check = require('../libs/checkLib');
const response = require('../libs/responseLib');
const CommentModel = mongoose.model('Comment')


let addComment = (req,res)=>{
    let newComment = new CommentModel({
        commentId:shortid.generate(),
        issueId:req.body.issueId,
        userId:req.body.userId,
        userName:req.body.userName,
        message:req.body.message
    })
    newComment.save((err,newIssue)=>{
        if(err){
            logger.error(err.messsage,'CommentController:Create Comment',10)
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

        CommentModel.find({'issueId':req.params.issueId}, (err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Issue Not Found.')
                let apiResponse = response.generate(true, 'Comment Not Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info("Issue found successfully","CommentController:commentById",5)
                let apiResponse = response.generate(false, 'Comment Found Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}


let deleteComment = (req, res) => {
    console.log(req.body.commentId)
        if (check.isEmpty(req.body.commentId)) {
    
            console.log('commentId should be passed')
            let apiResponse = response.generate(true, 'commentId is missing', 403, null)
            res.send(apiResponse)
        } else {
    
            CommentModel.remove({'commentId': req.body.commentId}, (err, result) => {
                if (err) {
                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                    res.send(apiResponse)
                } else if (check.isEmpty(result)) {
                    console.log('comment Not Found.')
                    let apiResponse = response.generate(true, 'Image Not Found.', 404, null)
                    res.send(apiResponse)
                } else {
                    console.log('comment Deletion Success')
                    let apiResponse = response.generate(false, 'Comment Deleted Successfully', 200, result)
                    res.send(apiResponse)
                }
            })
        }
    }
module.exports ={
    addComment:addComment,
    viewByIssueId:viewByIssueId,
    deleteComment:deleteComment
}