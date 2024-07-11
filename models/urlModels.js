import mongoose from 'mongoose';
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
    urlClickcount:{
        type:Number,
        default:0
    }
},{timestamps:true}) 

const url  = mongoose.model('Url',urlSchema);
export default url;

