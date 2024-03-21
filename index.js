const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config({path:'../.env'});
const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`Server listen on the port ${port}`);
})
