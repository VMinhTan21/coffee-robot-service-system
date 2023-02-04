const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectID = Schema.ObjectID

const Order = new Schema({
    ObjectID: String,
    Date: String,
    StaffID: String,
    OrderList: Array,
    Note: String,
    Total: Number
});

module.exports = mongoose.model('Orders', Order)