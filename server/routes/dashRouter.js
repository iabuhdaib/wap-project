const express = require('express');
const router = express.Router();

const dashController = require('../controllers/dashController')

router.get("/", dashController.open);


module.exports = router;