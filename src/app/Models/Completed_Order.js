const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectID = Schema.ObjectID

const Completed_Order = new Schema({
    ObjectID: String,
    Date: String,
    Status: String,
    StaffID: String,
    OrderList: Array,
    Note: String,
    Total: Number
});

module.exports = mongoose.model('Completed_Order', Completed_Order)