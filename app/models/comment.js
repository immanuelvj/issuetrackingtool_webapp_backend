const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let CommentSchema = new Schema({
    commentId:{
        type:String
    },
    issueId:{
        type:String
    },
    userId:{
        type:String
    },
    userName:{
        type:String
    },
    message:{
        type:String
    }
})

mongoose.model('Comment',CommentSchema);