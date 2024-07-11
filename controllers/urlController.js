import urlModel from '../models/urlModels.js';
import { customAlphabet } from 'nanoid'
import { isValidUrl, isValidShortCode } from '../validator/validation.js';
import redisClient from '../redisConfig.js';


// Generate shortURL for longURL:
export async function createShortURL(req, res) {
    try {
        const longURL = req.body.longURL;
        if (!longURL) {
            return res.status(400).send({ status: false, message: " Invalid URL. Please provide a URL." });

        }

        if (!isValidUrl(longURL)) {
            return res.status(400).send({ status: false, message: " Invalid URL format. Please provide a valid URL " })
        }

        // Generate shortCode of size 8 by using base 62 characters(0-9,A-Z,a-z)
        const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const nanoid = customAlphabet(alphabet, 8)
        const shortCode = nanoid() 


        // Append baseURL with the unique generated shortCode to generate shortURL
        const shortURL = `${process.env.BASE_URL}/${shortCode}`;

        // Create a new instance of urlModel
        const newURL = new urlModel({
            longURL: longURL,
            shortCode: shortCode,
            urlClickcount: 0
        });

        // Save the newURL instance to the database
        await newURL.save();

        return res.status(201).send({ status: true, message: " A SHORTURL HAS BEEN CREATED ", shortUrl: shortURL });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


// Redirect user to longURL of provided shortURL:
export async function redirectUrl (req, res) {
    try {
        const shortCode = req.params.shortCode;

        if (!isValidShortCode(shortCode)) {
            return res.status(400).send({ status: false, message: " Invalid shortURL format. Please provide a valid shortURL " });
        }

        // If longURL is found in Redis, use it and increment the click count in Redis as well in mongodb
        let isexistUrl = await redisClient.get(shortCode);
        if (isexistUrl) {
            let parseUrl = JSON.parse(isexistUrl)
            await urlModel.findOneAndUpdate({ shortCode: shortCode }, { $inc: { urlClickcount: 1 } })
            parseUrl.urlClickcount++;
            await redisClient.set(shortCode, JSON.stringify(parseUrl))
            console.log("cache hit")
            return res.status(301).redirect(parseUrl.longURL)
        }

        // If not in Redis, fetch from MongoDB and update click count
        const isValidshortUrl = await urlModel.findOneAndUpdate({ shortCode: shortCode },
            { $inc: { urlClickcount: 1 } },
            { new: true }).select('longURL urlClickcount')

        const redisData = {
            longURL : isValidshortUrl.longURL,
            urlClickcount : isValidshortUrl.urlClickcount
        }

        await redisClient.set(shortCode, JSON.stringify(redisData));

        console.log("redirect from mongodb")
        return res.status(301).redirect(isValidshortUrl.longURL)

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


// Get total number of hits on shortURL:
export async function clickTracker(req, res) {
    const shortCode = req.params.shortCode;

    if (!isValidShortCode(shortCode)) {
        return res.status(400).send({ status: false, message: " Invalid shortURL format. Please provide a valid shortURL " });
    }

    // fetch clickCount from redis database
    const isexistUrl = await redisClient.get(shortCode)
    if (isexistUrl) {
        let parseUrl = JSON.parse(isexistUrl);
        return res.status(200).send({ status: true, totalClicks: parseUrl.urlClickcount })
    }

    // If in case redis database doesn't work , fetch clickCount from mongodb database
    const isAvailable = await urlModel.findOne({ shortCode: shortCode });
    if (!isAvailable) {
        return res.status(404).send({ status: false, message: " INVALID SHORTURL,Please check the URL and try again " });
    }

    return res.status(200).send({ status: true, totalClicks: isAvailable.urlClickcount })

}



