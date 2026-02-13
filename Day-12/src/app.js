const express = require('express');
const connect = require('../src/config/database.js');
const Usermodel = require('../src/model/user.model.js');
const AuthRoute = require('../src/route/auth.route.js');
const cookie = require('cookie-parser');
require('dotenv').config();
connect();
const app = express();
app.use(cookie())
app.use(express.json())
app.use('/auth',AuthRoute)
app.use(express.json())

module.exports = app;