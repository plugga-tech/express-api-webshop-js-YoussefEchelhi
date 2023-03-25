const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
 name: String,
 owner: {
    type: Schema.Types.ObjectId,
    ref: "users"
 }
});


const Order = mongoose.model('Order', orderSchema);
module.exports = Order;