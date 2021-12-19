const express = require('express');
const path = require('path');
const routes = require('./router');
const cors = require('cors');
const mongoose = require('mongoose');

//  initiate dotenv and make your environment variables available throughout your application
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();

dotenv.config();

// middleware section
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

const PORT = 5000 || process.env.PORT;

// connect to db
var server;
mongoose.connect("mongodb+srv://Vipin:Vipin@cluster0.8w224.mongodb.net/Interviews?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
        .then( server = app.listen(PORT, () => console.log(`server is running on port ${PORT}`)))
        .catch(e => console.log('error in conneting to db ', e));

 // routes       
app.use(routes);