const mongoose = require('mongoose');

const UserHistoryMddel = mongoose.model('result',{
    height:{
        required:true,
        type:Number
    },
    weight:{
        required:true,
        type:Number
    },
    result:{
        required:true,
        type:Number
    },
    user_id:String
})

module.exports = {UserHistoryMddel};