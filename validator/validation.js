//Validation Functions//

// Checks whether the provided URL string is valid.
// The URL string should include the protocol (http, https, ftp) followed by colon and double slashes.
// Returns true if the URL is valid, otherwise false.
function isValidUrl(url) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
}


// Checks whether the provided shortCode is in the correct format.
// ShortCode should only include alphanumeric characters (letters and digits).
// Returns true if the shortCode is valid, otherwise false.
const isValidShortCode = (shortcode) => {
    const uniqidRegex = /^[a-zA-Z0-9]+$/;
    return uniqidRegex.test(shortcode);
};

//Exports all validation functions
module.exports = {isValidUrl,isValidShortCode};