const routes = require('./routes/index')
const express = require('express')
const path = require('path')

const app = express()


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


app.use('/', routes);

module.exports = app;