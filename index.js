const express = require('express');
const app = express();
app.use(express.json())


const routes = require('./router/routes');

require('dotenv').config({path:'../.env'});
const port = process.env.PORT || 3001;

const mongoose = require('mongoose');
mongoose.connect(process.env.clusterString).then(() => {console.log("mongoDB successfully connected")})
.catch((error) => {console.log(error.message)});

app.use('/',  routes);

app.listen(port,()=>{
    console.log(`Server listen on the port ${port}`);
})
