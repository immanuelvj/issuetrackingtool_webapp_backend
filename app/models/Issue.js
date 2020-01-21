const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    issueId:{
        type:String,
        index:true,
        unique:true
    },
    issueName:{
        type:String,
    },
    issueStatus:{
        type:String,
    },
    issueDescription:{
        type:String,
    },
    issueReporterName:{
        type:String,
    },
    issueReporterId:{
        type:String,
    },
    issueAssigneeName:{
        type:String,
    },
    issueAssigneeId:{
        type:String,
    },
    issueCreatedOn:{
        type:Date,
    },
    issueLastModified:{
        type:Date,
    }
})

mongoose.model('Issue',issueSchema);