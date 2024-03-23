const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    longURL:{
        type:String,
        required:true
    },
    shortCode:{
        type:String,
        required:true,
        unique:true
    },
    shortURL:{
        type:String,
        required:true,
        unique:true
    },
    urlClickcount:{
        type:Number,
        default:0
    }
},{timestamps:true}) 

module.exports = mongoose.model('url',urlSchema);

