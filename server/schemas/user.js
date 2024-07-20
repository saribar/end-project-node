const mongoose = require('mongoose'); 

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  userId:{
    type:String,
    require: true
  },
  phone:{
    type:String,
    require: true
  },
  password:{
    type: String,
    require: true
  }
})

const UserModel=mongoose.model('User', UserSchema)
exports.UserModel=UserModel


