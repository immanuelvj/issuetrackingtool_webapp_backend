const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const logger = require('./../libs/loggerLib');
const check = require('../libs/checkLib');
const response = require('../libs/responseLib');
const IssueModel = mongoose.model('Issue');
const SocketLib = require('../libs/socketLib');


let viewByAssigneeId = (req, res) => {

    if (check.isEmpty(req.params.issueAssigneeId)) {

        console.log('IssueId should be passed')
        let apiResponse = response.generate(true, 'IssueAssigneeId is missing', 403, null)
        res.send(apiResponse)
    } else {
        console.log(req.query.sort)
        IssueModel.find({'issueAssigneeId':req.params.issueAssigneeId})
        .skip(parseInt(req.query.skip) || 0)
        .lean()
        .limit(5)
        .sort(req.query.sort)
        .exec((err,result)=>{
            
            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Issue Not Found.')
                let apiResponse = response.generate(true, 'Issue Not Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info("Issue found successfully","IssueController:IssueBlogById",5)
                let apiResponse = response.generate(false, 'Issue Found Successfully.', 200, result)
                res.send(apiResponse)
            }

        })
    }
}

//end of View by IssueAssigneeId


//create  a Issue Function

let createIssueFucntion = (req,res) =>{
    
    let createIssue = () =>{
        return new Promise((resolve,reject)=>{
            if(check.isEmpty(req.body.issueName)){
                let apiResponse = response.generate(true, '"Issue Name" parameter is missing"', 400, null)
                reject(apiResponse)
            }
            else if(check.isEmpty(req.body.issueStatus)){
                let apiResponse = response.generate(true, '"Issue Status" parameter is missing"', 400, null)
                reject(apiResponse)
            }
            else if(check.isEmpty(req.body.issueDescription)){
                let apiResponse = response.generate(true, '"Issue Description" parameter is missing"', 400, null)
                reject(apiResponse)
            }
            else if(check.isEmpty(req.body.issueAssigneeId)){
                let apiResponse = response.generate(true, '"Issue Assignee" parameter is missing"', 400, null)
                reject(apiResponse)
            }
            else {
            let newIssue = new IssueModel({
                issueId:shortid.generate(),
                issueName:req.body.issueName,
                issueStatus:req.body.issueStatus,
                issueDescription:req.body.issueDescription,
                issueReporterName:req.body.issueReporterName,
                issueReporterId:req.body.issueReporterId,
                issueAssigneeName:req.body.issueAssigneeName,
                issueAssigneeId:req.body.issueAssigneeId,
                issueCreatedOn:time.convertToLocalTime(),
                issueLastModified:time.convertToLocalTime(),
            })

            newIssue.save((err,newIssue)=>{
                if(err){
                    logger.error(err.messsage,'IssueController:Create Issue',10)
                    let apiResponse = response.generate(true,'Failed To create a Issue',500,null)
                    reject(apiResponse);
                }
                else{
                    let newIssueObj = newIssue.toObject();
                    resolve(newIssueObj)
                    console.log(newIssueObj)
                }
            })
            }    
    
        })
    }
    
    createIssue(req,res)
     .then((resolve)=>{
        console.log(resolve)
        let apiResponse = response.generate(false, 'Issue created', 200, resolve)
        res.send(apiResponse)
     })
     .catch((err) => {
        console.log(err);
        res.send(err);
    })
}

//end of Create a Issue Function

//Get all Issue Function 



let getAllIssue = (req, res) => {
    IssueModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Issue Controller: getAllIssue', 10)
                let apiResponse = response.generate(true, 'Failed To Find Issue Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'Issue Controller: getAllIssue')
                let apiResponse = response.generate(true, 'No Issue Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Issue Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}



// End of Get all issue function


//View issue by Id

let viewByIssueId = (req, res) => {

    if (check.isEmpty(req.params.issueId)) {

        console.log('IssueId should be passed')
        let apiResponse = response.generate(true, 'IssueId is missing', 403, null)
        res.send(apiResponse)
    } else {

        IssueModel.findOne({'issueId':req.params.issueId}, (err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Issue Not Found.')
                let apiResponse = response.generate(true, 'IssueId Not Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info("Issue found successfully","IssueController:IssueBlogById",5)
                let apiResponse = response.generate(false, 'Issue Found Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}

//end of view by issue Id
let deleteIssue = (req, res) => {
console.log(req.body.issueId)
    if (check.isEmpty(req.body.issueId)) {

        console.log('IssueId should be passed')
        let apiResponse = response.generate(true, 'IssueId is missing', 403, null)
        res.send(apiResponse)
    } else {

        IssueModel.remove({'issueId': req.body.issueId}, (err, result) => {
            if (err) {
                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                console.log('Issue Not Found.')
                let apiResponse = response.generate(true, 'Issue Not Found.', 404, null)
                res.send(apiResponse)
            } else {
                console.log('Issue Deletion Success')
                let apiResponse = response.generate(false, 'Issue Deleted Successfully', 200, result)
                res.send(apiResponse)
            }
        })
    }
}

//end of Delete Issue Function 


let editIssue = (req,res)=>{

    if (check.isEmpty(req.params.issueId)) {
        let apiResponse = response.generate(true, 'IssueId is missing', 403, null)
        res.send(apiResponse)
    } else {
        options = req.body
        options.issueLastModified = time.now();
        IssueModel.update({'issueId':req.params.issueId}, options, { multi: true }).exec((err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Issue Not Found.')
                let apiResponse = response.generate(true, 'Issue Not Found', 404, null)
                res.send(apiResponse)
            } else {
                console.log('Issue Edited Successfully')
                let finalResult = {
                    issueId:req.params.issueId,
                    changes:req.body
                }
                let apiResponse = response.generate(false, 'Issue Edited Successfully', 200,finalResult )
                res.send(apiResponse)
            }
        })
    }    

}

module.exports = {
    viewByAssigneeId:viewByAssigneeId,
    createIssueFucntion:createIssueFucntion,
    getAllIssue:getAllIssue,
    viewByIssueId:viewByIssueId,
    deleteIssue:deleteIssue,
    editIssue:editIssue
}