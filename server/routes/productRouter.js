const express = require("express");
const router = express.Router();

const productController = require('../controllers/productController');



router.get('/', productController.fetchAll);
router.get('/:id', productController.getProductById);
router.put("/:id", productController.update);


module.exports = router;