const urlModel = require('../models/urlModels');
const uniqid = require('uniqid');
const validator = require('../validator/validation');

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>generate shortURL for longURL>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

const createShortURL = async function (req, res) {
    try {
        const data = req.body;
        if (!data.longURL) {
            return res.status(400).send({ status: false, message: "Invalid URL. Please provide a URL." });

        }

        if (!validator.isValidUrl(data.longURL)) {
            return res.status(400).send({ status: false, message: "Invalid URL format. Please provide a valid URL" })
        }

        //Check if the provided longURL is already present in the database
        const existingURL = await urlModel.findOne({ longURL: data.longURL });
        if (existingURL) {
            return res.status(200).send({ status: true, message: "shortURL already exists", shortURl: existingURL.shortURL });
        }
        //Generate a unique shortCode of length 16
        const shortCode = uniqid();

        //Append baseURL with the unique generated shortCode to generate shortURL
        const shortURL = `${process.env.BASE_URL}/${shortCode}`;

        const newURL = {
            longURL: data.longURL,
            shortCode: shortCode,
            shortURL: shortURL,
            urlClickcount: 0
        }

        await urlModel.create(newURL);


        return res.status(201).send({ status: true, message: "A SHORTURL HAS BEEN CREATED", ShortURL: shortURL });


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Redirect user to longURL of provided shortURL>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

const redirectUrl = async function (req, res) {
    try {
        const shortCode = req.params.shortCode;

        if (!validator.isValidShortCode(shortCode)) {
            return res.status(400).send({ status: false, message: "Invalid shortURL format. Please provide a valid shortURL" });
        }
       
        //Update urlClickcount by 1 on the provided shortUrl of longURL when user clicks on shortUrl

        const isValidshortUrl = await urlModel.findOneAndUpdate(
            { shortCode: shortCode },
            { $inc: { urlClickcount: 1 } });

        
        //If the user provides a wrong shortURL which is not present in the database   
        if (!isValidshortUrl) {
            return res.status(404).send({ status: false, message: "INVALID SHORTURL,Please check the URL and try again" });
        }

        return res.status(302).redirect(isValidshortUrl.longURL);

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Get the number of hits on shortURL>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
const clickTracker = async function (req, res) {
    const shortCode = req.params.shortCode;

    if (!validator.isValidShortCode(shortCode)) {
        return res.status(400).send({ status: false, message: "Invalid shortURL format. Please provide a valid shortURL" });
    }
    
    //If the user provides a wrong shortURL which is not present in the database
    const isAvailable = await urlModel.findOne({ shortCode: shortCode });
    if (!isAvailable) {
        return res.status(404).send({ status: false, message: "INVALID SHORTURL,Please check the URL and try again" });
    }

    return res.status(200).send({ status: true,totalClicks: isAvailable.urlClickcount})

}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Export controller functions>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
module.exports = { createShortURL, redirectUrl,clickTracker};
