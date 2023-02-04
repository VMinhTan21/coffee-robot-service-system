const Mongoose = require('mongoose')
const URL = 'mongodb+srv://coffeerobot:coffeerobot@cluster0.upcujgw.mongodb.net/?retryWrites=true&w=majority'

async function Connect() {
    try {
        await Mongoose.connect(URL, {
            dbName: 'CoffeeService',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        // TODO: Check connection to MongoDB Server
        console.log("CONNECTED TO MONGODB SERVER")
    }
    catch (error) {
        console.log("CONNECT TO MONGODB SERVER FAILED")
    }
}

module.exports = { Connect }
