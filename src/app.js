const path = require('path')
const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars')

const Database = require('./configs/Database')
const route = require('./routes')

const app = express()
const port = process.env.port || 3000 

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
app.use("/img", express.static(path.join(__dirname, '/public/img')))
app.use("/css", express.static(path.join(__dirname, '/public/css')))
app.use("/app", express.static(path.join(__dirname, '/app')))
app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

app.use(morgan('combined'))

Database.Connect()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'resources', 'views'))

route(app, port, server, io)

