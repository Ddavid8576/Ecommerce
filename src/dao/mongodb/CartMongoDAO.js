const Cart = require('../../models/Cart');

class CartMongoDAO {
  async create(cartData) {
    const cart = new Cart(cartData);
    return await cart.save();
  }

  async findByUserId(userId) {
    return await Cart.findOne({ userId });
  }

  async update(id, updates) {
    const cart = await Cart.findById(id);
    if (!cart) throw new Error('Carrito no encontrado');
    Object.assign(cart, updates);
    return await cart.save();
  }
}

module.exports = CartMongoDAO;