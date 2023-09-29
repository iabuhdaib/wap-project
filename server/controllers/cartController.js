const Cart = require('../models/cart');

exports.save = (req, res, next) => {
    const cart = new Cart(null, req.body.userId, req.body.productId).save();
    res.status(201).json(cart);
};

exports.removeFromUserCart = (req, res, next) => {
    new Cart(null,req.body.userId,req.body.productId).delete();
    res.status(204).end();
}
exports.getByUserId =(req, res, next) => {
    res.json(Cart.getByUserId(req.params.userId));
}


exports.placeOrder =(req, res, next) => {
    res.json(Cart.placeOrder(req.params.userId));
}


