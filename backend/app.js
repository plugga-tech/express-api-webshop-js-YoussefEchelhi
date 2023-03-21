var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

require("dotenv").config();

const MongoClient = require('mongodb').MongoClient;


var app = express();

app.use(cors());

MongoClient.connect("mongodb://127.0.0.1:27017")
.then(client => {
    console.log("Databasen är ok");

    const db = client.db("Youssef-Echelhi")
    app.locals.db = db;  
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

module.exports = app;
