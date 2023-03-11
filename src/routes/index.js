const HomeRouter = require('./Home')
const OrderFormRouter = require('./OrderForm')


function route(app, port, SocketServer, SocketIO) {
    app.use('/OrderNew', OrderFormRouter)
    app.use('/', HomeRouter)

    SocketServer.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })

    SocketIO.on("connection", function (Socket) {

        Socket.on("Orders-List-cancel", function (data) {
            console.log('Cancel ' + data)
        })

        Socket.on("Orders-List-delivery", function (data) {
            console.log('Delivery ' + data)
        })

        Socket.on("Orders-List-set-priority", function (data) {
            console.log('set priority for ' + data)
        })
    
        Socket.on("Client_new_order", function () {
            SocketIO.emit("Noti_new_order_to_staff")
        })

        Socket.on("disconnect", function () {
            console.log(Socket.id + " is disconnected")
        })

        // Event had new order
    })
}

module.exports = route

