
# URL Shortener Application

A URL Shortener application is a Node.js-based system developed using the Express.js framework, with MongoDB as the chosen database and EJS as the template engine for server-side rendering of the user interface.

A URL shortener application typically involves creating a service that takes  long URLs and converts them into shorter, more manageable links. These shortened links redirect users to the original long URL when clicked. The primary purpose of a URL shortener is to make links more concise and easier to share, particularly on platforms like social media where character limits may be a concern. Additionally, the application tracks the number of hits on each shortened URL with a click counter.

## User interface
This application includes a user-friendly interface where users can :-

*  Enter a long URL and receive a shortened URL.
* View and redirect to the long URL of the shortened URL.
* Track the total click count of their shortened URLs.

## Example
Here is an example of the application's User Interface :-

### Homepage 

![Screenshot (13)](https://github.com/user-attachments/assets/24a7be12-af58-482f-abaf-bd5089038221)

*The homepage allows users to enter a long URL to shorten it and also allows users to get the click count of their short URLs.*

###  Display Shortened URL

![Screenshot (14)](https://github.com/user-attachments/assets/cd7df69c-f990-4a43-b5eb-e3eccbb25815)

*After entering a long URL, it displays the short URL along with a button to show the total clicks of your shortened URL.*

### Tracking Click Count 

![Screenshot (15)](https://github.com/user-attachments/assets/533346a1-0857-4051-8703-c9a716274b58)

![Screenshot (16)](https://github.com/user-attachments/assets/520723da-1f00-4fed-9bc5-cda18394ae81)

*Users can track the number of clicks on their shortened URLs.*

## url Model
urlModel stores information about the URLs, including their long and shortened versions, associated unique identifiers (short codes), and tracking the number of clicks.

* **Fields:**

    `longURL`: `String` (Represents the long URL provided by the user).

   `shortCode`: `String` (Represents the unique identifier for the shortened URL. this field must be unique).

  `urlClickcount`: `Number` (Represents the total number of clicks on the shortened URL. default value is 0).

## Endpoints

### URL

- **Generate a short URL**

  - **Endpoint:** `POST /generateShorturl`
  - **Description:** Generates a short URL from the provided long URL and saves it in the database with the fields `longURL`, `shortCode`, and `urlClickcount`. Returns the shortened URL.

- **Redirect to the long URL associated with a short URL**

  - **Endpoint:** `GET /:shortCode`
  - **Description:** Redirects the user to the long URL associated with the provided short URL. Increments the click count for the short URL.

- **Track the total number of clicks on a short URL**

  - **Endpoint:** `GET /clickCount/:shortCode`
  - **Description:** Returns the total number of clicks for the provided short URL.

- **Track clicks based on the entered short URL**

  - **Endpoint:** `POST /trackClicks`
  - **Description:** Accepts a short URL in the request body and returns the total number of clicks associated with it.

- **Examples:**
````json
{
  "longURL": "https://clemensjarnach.github.io/02-articles/2023-05-02-article.html",
  "shortCode": "5dy815l0lu6vf41w",
  "urlClickcount": 1
}
````

## Running URL Shortener Application

To run the `urlShortener` application, follow these steps:

1. **Ensure that you have Node.js and npm installed on your system.**

2. **Clone the repository to your local machine:**

    ```bash
    git clone -b feature/url-shortening https://github.com/Dipali127/URL_shortener.git
    ```

3. **Navigate to the root directory of the project:**

    ```bash
    cd URL_shortener
    ```

4. **Install dependencies:**

    ```bash
    npm install
    ```

5. **Set up any necessary environment variables or configuration files.**

6. **Start the application:**

    ```bash
    npm start
    ```

### Frontend Setup

The application uses EJS as the template engine for rendering the user interface. Ensure that the EJS views are correctly set up in the `views` directory, and the application is configured to serve static files (e.g., CSS) from the `public` directory.

### Backend Setup

Before starting the application, ensure that you have set up the following:

- **Environment Variables:**
    - Create a new file named `.env` in the root directory of the project.
    - Set the following required environment variables in the `.env` file:
        - `PORT`: Set this variable to the desired port number. By default, the application listens on port 3000.
        - `DATABASE_CLUSTER_STRING`: Set this variable to the connection string for your MongoDB database cluster.
        - `BASE_URL`: Set this variable to the base URL of your application. For creating short URLs, you can set it to `http://localhost:3000`.
        - `REDIS_HOST`: Set this variable to the hostname of your Redis server (e.g., `localhost`).
        - `REDIS_PORT`: Set this variable to the port number Redis is listening on (default is `6379`).

- **Database Setup:**
    - Install Redis for fast retrieval of data. You can download and install Redis from the [official Redis website](https://redis.io/download).
    - Install Mongoose, the MongoDB object modeling tool for Node.js, by running the following command in your terminal:

    ```bash
    npm install mongoose
    ```

By following these steps and ensuring that the necessary configurations are in place in your `.env` file, you should be able to run the `urlShortener` application successfully with both frontend and backend functionalities.

## Tech Stack

- **Server:** Node.js, Express.js
- **Template Engine:** [EJS](https://www.npmjs.com/package/ejs)
- **Package for Unique Short Codes:** [nanoid](https://www.npmjs.com/package/nanoid)
- **Development Server Monitor:** [nodemon](https://www.npmjs.com/package/nodemon)
- **Environment Variables Management:** [dotenv](https://www.npmjs.com/package/dotenv)

## Helpful Links

[Visit this link to create short unique code using “nanoid” package] (https://github.com/ai/nanoid?tab=readme-ov-file#readme)

[Visit this link to know more about long URL] (https://medium.com/@hemant.ramphul/the-stucture-of-an-url-c59a6ccf7184)

