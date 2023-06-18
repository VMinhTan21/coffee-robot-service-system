const Order_model = require('../Models/Order')
const Completed_Order_model = require('../Models/Completed_Order')
const { multipleMongooseToObject } = require('../../util/mongoose')

var temp_Orders_list = []
var Orders_list = []
var Current_order = []
var Completed_orders = []

var isFirstConnect = true

class HomeController {

    Show(request, response, next) {

        Completed_Order_model.find({}, function (err, db) {
            Completed_orders = multipleMongooseToObject(db)
        })

        Order_model.find({}, function (err, db) {
            if (isFirstConnect) {
                temp_Orders_list = multipleMongooseToObject(db)
                Current_order = temp_Orders_list[0]
                for (let i = 1; i < temp_Orders_list.length; i++) {
                    Orders_list.push(temp_Orders_list[i])
                }

                isFirstConnect = false
            }

            response.render('Home', {
                 title: 'RbCo - Homepage',
                 Orders_list: Orders_list,
                 Current_order: Current_order,
                 Completed_orders: Completed_orders,
            })

            /*response.render('Home_test_ros3djs', {
                title: 'RbCo - Homepage',
                Orders_list: Orders_list,
                Current_order: Current_order,
                Completed_orders: Completed_orders,
            })*/
        })
    }

    Update(req, res, next) {

        console.log(req.params)

        let temp_order = []
        let index

        switch (req.params.act) {
            case 'delivery':
                temp_order = Current_order
                for (let i = 0; i < Orders_list.length; i++) {
                    if (Orders_list[i]._id == req.params.id) {
                        // Swap
                        Current_order = Orders_list[i]
                        Orders_list[i] = temp_order
                        break
                    }
                }
                break
            case 'set-priority':
                temp_order = Orders_list[0]

                for (let i = 1; i < Orders_list.length; i++) {
                    if (Orders_list[i]._id == req.params.id) {
                        // Swap
                        Orders_list[0] = Orders_list[i]
                        Orders_list[i] = temp_order
                        break
                    }
                }

                console.log('set priority')
                break
            case 'cancel':
                var temp = {
                    Date: String,
                    Status: String,
                    StaffID: String,
                    OrderList: Array,
                    Note: String,
                    Total: Number
                }

                for (let i = 1; i < Orders_list.length; i++) {
                    if (Orders_list[i]._id == req.params.id) {
                        index = i
                        break
                    }
                }

                temp.Date = Orders_list[index].Date
                temp.Status = 'Canceled'
                temp.StaffID = Orders_list[index].StaffID
                temp.OrderList = Orders_list[index].OrderList
                temp.Note = Orders_list[index].Note
                temp.Total = Orders_list[index].Total

                Completed_orders.push(temp)

                var new_completed_order = new Completed_Order_model(temp)
                new_completed_order.save()

                Orders_list.splice(index, 1)
                console.log('cancel')
                break

            default:
                console.log('Unhanlde event')
                break
        }

        res.render('Home', {
            title: 'RbCo - Homepage',
            Orders_list: Orders_list,
            Current_order: Current_order,
            Completed_orders: Completed_orders
        })
    }
}

module.exports = new HomeController
