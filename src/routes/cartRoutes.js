const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');
const authorization = require('../middleware/authorization');

router.post('/add', auth, authorization(['user']), cartController.addToCart);
router.post('/purchase', auth, authorization(['user']), cartController.purchase);

module.exports = router;