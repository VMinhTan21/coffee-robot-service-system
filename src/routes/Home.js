const express = require('express')
const route = express.Router()
const HomeController = require('../app/Controllers/HomeController')

route.get('/act/:id?/:act?', HomeController.Update)
route.post('/', HomeController.Show)
route.get('/', HomeController.Show)

module.exports = route