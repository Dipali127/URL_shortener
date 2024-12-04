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

export default mongoose.model('Url', urlSchema);


