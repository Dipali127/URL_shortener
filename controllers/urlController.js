const urlModel = require('../models/urlModels');
const uniqid = require('uniqid');
const validator = require('../validator/validation');

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>generate shortURL of longURL>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//



const createShortURL = async function(req,res){
    try{
        const data = req.body;
        if(!data.longURL){
            return res.status(400).send({status:false,message:"OOPS! Invalid URL"});
            
        }

        if(!validator.isValidUrl(data.longURL)){
            return res.status(400).send({status:false,message:"OOPS! Invalid URL"})
        }

        //provided longURL is already present in database
        const ispresentLongURL = await urlModel.findOne({longURL:data.longURL});
        if(ispresentLongURL){
            return res.status(200).send({status:true,message:"shortURL already exists",shortURl:ispresentLongURL.shortURL});
        }
        //generate unique shortCode of length 16
        const shortCode = uniqid();
        
    
        //append baseURL with unique generated shortCode to get shortURL
        const shortURL = `${process.env.BASE_URL}/${shortCode}`;

        const newURL = {
           longURL:data.longURL,
           shortCode:shortCode,
           shortURL:shortURL,
        }

        await urlModel.create(newURL);
        

        return res.status(201).send({status:true,message:"A SHORTURL HAS BEEN CREATED",ShortURL:shortURL});


    }catch(error){
        return res.status(500).send({status:false,message:error.message});
    }
}

const redirectUrl = async function(req,res){
    try{
        const shortCode = req.params.shortCode;
        
        if(!validator.isValidShortCode(shortCode)){
            return res.status(400).send({status:false, message:"OOPS! INVALID SHORTCODE"});
        }
        console.log(shortCode)
        const isValidshortUrl = await urlModel.findOne({shortCode:shortCode});
    
        
        if(!isValidshortUrl){
            return res.status(400).send({status:false,message:"SHORTURL NOT PRESESNT IN DATABASE"});
        }

        return res.status(302).redirect(isValidshortUrl.longURL);

        

    }catch(error){
        return res.status(500).send({status:false,message:error.message});
    }
}

module.exports = {createShortURL,redirectUrl};
