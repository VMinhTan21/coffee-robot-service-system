express = require('express')
route = express.Router()

OrderFormController = require('../app/Controllers/OrderFormController')

route.post('/Created', OrderFormController.CreateNewOrder)
route.get('/', OrderFormController.ShowForm)

module.exports = route