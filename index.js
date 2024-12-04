import { config } from 'dotenv';
config({ path: '../.env' });
import * as path from 'path';
import express from 'express';
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

import routes from './router/routes.js';
const port = process.env.PORT || 3001;

import mongoose from 'mongoose';
mongoose.connect(process.env.clusterString).then(() => { console.log("mongoDB successfully connected") })
    .catch((error) => { console.log(error.message) });

import redisClient from './redisConfig.js';
redisClient.connect().then(() => { console.log("connected to redis") }).catch((error) => console.log(error.message))

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.resolve('./views')));

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server listen on the port ${port}`);
})


