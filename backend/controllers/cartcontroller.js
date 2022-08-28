var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Cart } = require('../models/cart');

// => localhost:3000/cart/
router.get('/', (req, res) => {
   Cart.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retrivingcarts :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

   Cart.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retrivingcart :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var car = new Cart({
        pizza_name: req.body.pizza_name,
        price: req.body.price,
        quantity: req.body.quantity

    });
    car.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error incart Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var car = {
      pizza_name: req.body.pizza_name,
      price: req.body.price,
      quantity: req.body.quantity
    };
   Cart.findByIdAndUpdate(req.params.id, { $set: car }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error incart Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

   Cart.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error incart Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;
