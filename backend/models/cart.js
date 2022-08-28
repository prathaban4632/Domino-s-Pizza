const mongoose = require('mongoose');

var Cart = mongoose.model('Cart', {
    pizza_name: { type: String },
    price: { type: Number },
    quantity: { type: Number }

});

module.exports = { Cart };
