const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const socialUserSchema = new Schema({
    userId: {
        type: String,
        default: '',
        index: true,
        unique: true
      },
      firstName: {
        type: String,
        default: ''
      },
      email: {
        type: String,
        default: ''
      },
      createdOn :{
        type:Date,
        default:""
      }
})
mongoose.model('SocialUser', socialUserSchema)