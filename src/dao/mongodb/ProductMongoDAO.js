const Product = require('../../models/Product');

class ProductMongoDAO {
  async create(productData) {
    const product = new Product(productData);
    return await product.save();
  }

  async findById(id) {
    return await Product.findById(id);
  }

  async update(id, updates) {
    const product = await Product.findById(id);
    if (!product) throw new Error('Producto no encontrado');
    Object.assign(product, updates);
    return await product.save();
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = ProductMongoDAO;