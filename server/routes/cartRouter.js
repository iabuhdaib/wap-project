const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');



router.get('/:userId', cartController.getByUserId);
router.get('/placeOrder/:userId', cartController.placeOrder);
router.post('/', cartController.save);
router.delete("/", cartController.removeFromUserCart);


module.exports = router;