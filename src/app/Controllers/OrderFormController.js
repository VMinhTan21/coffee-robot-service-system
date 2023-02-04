// Database
const Order_model = require('../Models/Order')

class OrderFormController {
    // GET - Show form for client order
    ShowForm(request, response, next) {
        response.render('OrderForm', { title: 'Form for order' })
    }

    // POST - Send new order to waiter
    CreateNewOrder(request, response, next) {

        // Order successfully, create new document in database
        let Refreshment_Quantity = []
        let loop_length = request.body.Refreshment.length

        let Datetime_converted = request.body.Datetime.slice(0, request.body.Datetime.search('GMT') - 1)

        // Check is have 'Default' (Chọn món) in Refreshment list
        // Format [Refreshment_name, Refreshment_unit_price, Quantity]
        if (typeof request.body.Refreshment !== 'string') {
            for (let i = 0; i < loop_length; i++) {
                if (request.body.Refreshment[i] !== 'Default') {
                    Refreshment_Quantity.push([request.body.Refreshment[i], request.body.Refreshment_unit_price[i], request.body.Quantity[i]])
                }
            }
        } else {
            if (request.body.Refreshment !== 'Default') {
                Refreshment_Quantity.push([request.body.Refreshment, request.body.Refreshment_unit_price, request.body.Quantity])
            }  
        }

        var Your_order = {
            Date: Datetime_converted,
            StaffID: 'User',
            OrderList: Refreshment_Quantity,
            Note: request.body.Note,
            Total: request.body.Total_cost
        }

        var temp_Order_model = new Order_model(Your_order)

        // Check document before save to database
        console.log(temp_Order_model)

        temp_Order_model.save()

        response.render('OrderForm_Created', {  title: 'Order Successfully',
                                                Your_order: Your_order })
    }

    Update(request, response, next) {

    }
}

module.exports = new OrderFormController
