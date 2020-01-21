const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let ImageSchema = new Schema({
    imageId:{
        type:String
    },
    issueId:{
        type:String
    },
    userName:{
        type:String
    },
    imageData:{
        type:String
    }
})

mongoose.model('Image',ImageSchema);