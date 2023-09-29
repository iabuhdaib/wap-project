const Product = require('../models/product');



exports.fetchAll = (req, res, next) => {
    res.json(Product.getAll());
}

exports.getProductById =(req, res, next) => {
    res.json(Product.getProductById(req.params.id));
}


exports.update = (req, res, next) => {
    new Product(req.params.id, req.body.name, req.body.price, req.body.image,req.body.stock).update();
    res.status(204).end();
}

//return module.exports