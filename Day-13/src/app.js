const express = require('express');
const connect = require('./config/database.js');
const Usermodel = require('./model/user.model.js');
const AuthRoute = require('./route/auth.route.js');
const cookie = require('cookie-parser');
require('dotenv').config();
connect();
const app = express();
app.use(cookie())
app.use(express.json())
app.use('/auth',AuthRoute)
app.use(express.json())

module.exports = app;