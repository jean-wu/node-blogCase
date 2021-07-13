const express = require('express')
var router=require('./routes/route.js')
var session=require('express-session')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(session({
    secret:'session',
    resave:false,
    saveUninitialized:true
}))
app.use(router)
app.listen(3000, function () {
    console.log('running')
})