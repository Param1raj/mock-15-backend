const mongoose = require('mongoose');

const UserAuthModel = mongoose.model('user',{
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
})

module.exports = {UserAuthModel};