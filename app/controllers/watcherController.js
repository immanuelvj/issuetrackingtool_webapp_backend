const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const logger = require('./../libs/loggerLib');
const check = require('../libs/checkLib');
const response = require('../libs/responseLib');
const WatcherModel = mongoose.model('Watcher')


let addWatcher = (req,res)=>{
    let newWatcher = new WatcherModel({
        WatcherId:shortid.generate(),
        issueId:req.body.issueId,
        userId:req.body.userId,
        userName:req.body.userName
    })
    newWatcher.save((err,newIssue)=>{
        if(err){
            logger.error(err.messsage,'WatchController:Create watch',10)
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

        WatcherModel.find({'issueId':req.params.issueId}, (err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('Issue Not Found.')
                let apiResponse = response.generate(true, 'Watcher Not Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info("Watcher found successfully","WatcherController:watcherById",5)
                let apiResponse = response.generate(false, 'Watcher Found Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}


let deleteWatcher = (req, res) => {
    console.log(req.body.WatcherId)
        if (check.isEmpty(req.body.WatcherId)) {
    
            console.log('WatcherId should be passed')
            let apiResponse = response.generate(true, 'WatcherId is missing', 403, null)
            res.send(apiResponse)
        } else {
    
            WatcherModel.remove({'WatcherId': req.body.WatcherId}, (err, result) => {
                if (err) {
                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                    res.send(apiResponse)
                } else if (check.isEmpty(result)) {
                    console.log('Issue Not Found.')
                    let apiResponse = response.generate(true, 'Watcher Not Found.', 404, null)
                    res.send(apiResponse)
                } else {
                    console.log('Issue Deletion Success')
                    let apiResponse = response.generate(false, 'Watcher Deleted Successfully', 200, result)
                    res.send(apiResponse)
                }
            })
        }
    }
    
module.exports ={
    addWatcher:addWatcher,
    viewByIssueId:viewByIssueId,
    deleteWatcher:deleteWatcher
}