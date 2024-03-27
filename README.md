
# URL Shortener Application


A URL Shortener application is a Node.js-based system developed using the Express.js framework, with MongoDB as the chosen database. A URL shortener project typically involves creating a service that takes long URLs and converts them into shorter, more manageable links. These shortened links redirect users to the original long URL when clicked. The primary purpose of a URL shortener is to make links more concise and easier to share, particularly on platforms like social media where character limits may be a concern.
Track the number of hits from your URL with our click counter.


For example, if we shorten the following URL through TinyURL:




```bash
  https://babeljs.io/blog/2020/10/15/7.12.0#class-static-blocks-12079httpsgithubcombabelbabelpull12079-12143httpsgithubcombabelbabelpull12143
```
We would get:

````bash
   https://tinyurl.com/y4ned4ep
````
The shortened URL is nearly one-fifth the size of the actual URL.








## Endpoints

### URL 



- **Generate a shortURL**

     Endpoint: `POST /generateShortUrl`

     Description: This endpoint generates a short URL from a provided longURL and adds shortURL,shortCode,urlClickcount along with longURL in the database.

- **Redirecct to the shortURL associated with longURL** 

     Endpoint: `GET /:shortCode`

     Description:This endpoint redirects the user to the long URL associated with the provided short URL code (`shortCode`).

- **Track the total number of Hits on the provided shortURL**

     Endpoint: ` Get /clickCount/:shortCodes`

     Description: This endpoint calculates the total number of hits on the provided short URL identified by `shortCodes`.




## urlModel

urlModel stores information about the URLs, including their long and shortened versions, associated unique identifiers (short codes), and tracking the number of hits.

- **Fields:**

    `longURL`: String (Represents the long URL provided by the user).

   `shortCode`: String (Represents the shortened URL generated for the long URL).

  `shortURL`: String (Represents the unique identifier associated with the shortened URL).

  `urlClickcount`: Number (Represents the total number of hits or clicks on the shortened URL). Default value is 0.


- **Examples:**
````json
{
  "longURL": "https://clemensjarnach.github.io/02-articles/2023-05-02-article.html",
  "shortCode": "5dy815l0lu6vf41w",
  "shortURL": "http://localhost:3000/5dy815l0lu6vf41w",
  "urlClickcount": 1
}
````
## Running urlShortener application

To run the `urlShortener` application, follow these steps:

1. Ensure that you have Node.js and npm installed on your system.

2. Clone the repository to your local machine:

    ```bash
    git clone -b feature/url-shortening https://github.com/Dipali127/URL_shortener.git
    ```

3. Navigate to the root directory of the project:

    ```bash
   cd URL_shortener
    ```

4. Install dependencies:

    ```bash
    npm install
    ```

5. Set up any necessary environment variables or configuration files. See the [Configuration](#configuration) section below for details.

6. Start the application:

    ```bash
    npm start
    ```

Before starting the application, ensure that you have set up the following:

- **Environment Variables**: 
    - Create a new file named `.env` in the root directory of the project.
    - Set the following required environment variables in the `.env` file:
        - `PORT`: Set this variable to the desired port number. By default, the application listens on port 3001.
        - `DATABASE_CLUSTER_STRING`: Set the variable to the connection string for your MongoDB database cluster.
        - `BASE_URL`: Set the variable to the base URL of your application. For creating short URLs, you can set it to `http://localhost:3000`.

- **Database Setup**: 

    - Install Mongoose, the MongoDB object modeling tool for Node.js, by running the following command in your terminal:

    ```bash
    npm install mongoose
    ```

    - Use Mongoose to connect to your MongoDB database cluster. You can find the connection string in your MongoDB Atlas dashboard.
    - If you haven't set up a MongoDB database cluster yet, follow the documentation on MongoDB's website to create and configure one.

By following these steps and ensuring that the necessary configurations are in place in your `.env` file, you should be able to run the `urlShortener` application successfully.
## Tech Stack

- **Server:** Node.js, Express.js
- **Package for unique short codes:** [uniqid](https://www.npmjs.com/package/uniqid)
- **Development Server Monitor:** [nodemon](https://www.npmjs.com/package/nodemon)
- **Environment Variables Management:** [dotenv](https://www.npmjs.com/package/dotenv)


## Helpful Links

[Visit this link to create short unique code using “uniqid” package] (https://www.npmjs.com/package/uniqid?activeTab=readme)

[Visit this link to know more about long URL] (https://medium.com/@hemant.ramphul/the-stucture-of-an-url-c59a6ccf7184)



