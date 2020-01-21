const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let watcherSchema = new Schema({
    WatcherId:{
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
    }
})

mongoose.model('Watcher',watcherSchema);