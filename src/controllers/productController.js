const ProductRepository = require('../repositories/ProductRepository');
const ProductMongoDAO = require('../dao/mongodb/ProductMongoDAO');

const productRepository = new ProductRepository(new ProductMongoDAO());

exports.createProduct = async (req, res) => {
  try {
    const product = await productRepository.create(req.body);
    res.json({ message: 'Producto creado', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await productRepository.update(req.params.id, req.body);
    res.json({ message: 'Producto actualizado', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await productRepository.delete(req.params.id);
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};