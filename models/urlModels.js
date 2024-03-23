// longUrl: Represents the original, long URL. It's of type String and is required.
// shortCode: Represents the unique code generated for the short URL. It's of type String, required, and has the unique constraint, ensuring each short URL has a unique code.
// clickCount: Represents the number of times the short URL has been clicked. It's of type Number and has a default value of 0.
// {timestamps:true}: This option automatically adds createdAt and updatedAt fields to the document, which can be useful for tracking when a URL was created or last updated.



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
        required:true
    },
},{timestamps:true}) 

module.exports = mongoose.model('url',urlSchema);

