const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const authorization = require('../middleware/authorization');

router.post('/', auth, authorization(['admin']), productController.createProduct);
router.put('/:id', auth, authorization(['admin']), productController.updateProduct);
router.delete('/:id', auth, authorization(['admin']), productController.deleteProduct);

module.exports = router;