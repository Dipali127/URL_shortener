const urlModel = require('../models/urlModels');
const uniqid = require('uniqid');
//const shortid = require('shortid')

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>generate shortURL of longURL>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//



const createShortURL = async function(req,res){
    try{
        const data = req.body;
        if(!data.longURL){
            return res.status(400).send({status:false,message:"OOPS! Invalid URL"});
        }
        const shortCode = uniqid();
        //const shortCode = generateShortCode();
    

        const shortURL = `${process.env.BASE_URL}/${shortCode}`;

        const newURL = {
           longURL:data.longURL,
           shortCode:shortCode,
           shortURL:shortURL,
           clickCount:[]
        }

        await urlModel.create(newURL);
        

        return res.status(200).send({status:true,message:"A SHORTURL HAS BEEN CREATED",ShortURL:shortURL});


    }catch(error){
        return res.status(500).send({status:false,message:error.message});
    }
}

const redirectUrl = async function(req,res){
    try{
        const shortCode = req.params.shortCode;
        console.log(shortCode)
        const isValidshortUrl = await urlModel.findOne({shortCode:shortCode});
        console.log(isValidshortUrl.longURL)
        
        // if(!isValidshortUrl){
        //     return res.status(400).send({status:false,message:"OOPS! INVALID SHORTURL"});
        // }

        return res.status(302).redirect(isValidshortUrl.longURL);

        

    }catch(error){
        return res.status(500).send({status:false,message:error.message});
    }
}

module.exports = {createShortURL,redirectUrl};
