// validation.js
// Checks whether the provided URL string is valid.
// The URL string should include the protocol (http, https, ftp) followed by colon and double slashes.
// Returns true if the URL is valid, otherwise false.
export function isValidUrl(url) {
    return /^(ftp|http|https):\/\/[^ "]+$/.test(url);
}

// Checks whether the provided shortCode is in the correct format.
// ShortCode should only include alphanumeric characters (letters and digits).
// Returns true if the shortCode is valid, otherwise false.
export const isValidShortCode = (shortcode) => {
    return /^[a-zA-Z0-9]+$/.test(shortcode);
};

export default {
    isValidUrl,
    isValidShortCode
};