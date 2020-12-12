const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const registerrout = require('./api/routes/register');

mongoose.connect('mongodb+srv://freakston:' + process.env.MONGO_ATLAS_PASS + '@node-freakston-image.8pcca.mongodb.net/node-freakston-image?retryWrites=true&w=majority',{ 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/register',registerrout);

app.get('/', (request, response) => response.render('index'));
app.set('view engine', 'ejs');
const port = 6968; // we are using port 6968 here
app.listen(port, () => console.log(`Server started on port ${port}`));