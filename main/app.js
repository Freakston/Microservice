const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const loginRout = require('./api/routes/login');

require('dotenv').config();

mongoose.connect('mongodb+srv://freakston:' + process.env.MONGO_ATLAS_PASS + '@node-freakston-image.8pcca.mongodb.net/node-freakston-image?retryWrites=true&w=majority',{ 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/login',loginRout);
app.use(express.static('views'));

module.exports = app;
