import { config } from 'dotenv';
config({ path: '../.env' });
import express from 'express';
const app = express();
app.use(express.json())

import routes from './router/routes.js';
const port = process.env.PORT || 3001;
import mongoose from 'mongoose';
mongoose.connect(process.env.clusterString).then(() => {console.log("mongoDB successfully connected")})
.catch((error) => {console.log(error.message)});



app.use('/',  routes);
import redisClient from './redisConfig.js';
redisClient.connect().then(() => { console.log("connected to redis") }).catch((error) => console.log(error.message))

app.listen(port,()=>{
    console.log(`Server listen on the port ${port}`);
})


