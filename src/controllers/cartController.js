const CartRepository = require('../repositories/CartRepository');
const ProductRepository = require('../repositories/ProductRepository');
const TicketRepository = require('../repositories/TicketRepository');
const CartMongoDAO = require('../dao/mongodb/CartMongoDAO');
const ProductMongoDAO = require('../dao/mongodb/ProductMongoDAO');
const TicketMongoDAO = require('../dao/mongodb/TicketMongoDAO');

const cartRepository = new CartRepository(new CartMongoDAO());
const productRepository = new ProductRepository(new ProductMongoDAO());
const ticketRepository = new TicketRepository(new TicketMongoDAO());

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
    let cart = await cartRepository.findByUserId(userId);
    if (!cart) {
      cart = await cartRepository.create({ userId, products: [] });
    }
    const product = await productRepository.findById(productId);
    if (!product || product.stock < quantity) {
      return res.status(400).json({ error: 'Producto no disponible o sin stock suficiente' });
    }
    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    if (productIndex >= 0) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
    await cartRepository.update(cart._id, cart);
    res.json({ message: 'Producto agregado al carrito', cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.purchase = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await cartRepository.findByUserId(userId);
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ error: 'Carrito vacío' });
    }
    const productsNotPurchased = [];
    const purchasedProducts = [];
    let totalAmount = 0;
    for (const item of cart.products) {
      const product = await productRepository.findById(item.productId);
      if (product && product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await productRepository.update(product._id, product);
        purchasedProducts.push({ productId: item.productId, quantity: item.quantity });
        totalAmount += product.price * item.quantity;
      } else {
        productsNotPurchased.push(item.productId);
      }
    }
    if (purchasedProducts.length > 0) {
      const ticket = await ticketRepository.create({
        code: `TICKET-${Date.now()}`,
        purchase_datetime: new Date(),
        amount: totalAmount,
        purchaser: req.user.email,
        products: purchasedProducts,
      });
      cart.products = cart.products.filter(item => productsNotPurchased.includes(item.productId.toString()));
      await cartRepository.update(cart._id, cart);
      res.json({ message: 'Compra realizada', ticket, productsNotPurchased });
    } else {
      res.status(400).json({ error: 'No se pudo comprar ningún producto', productsNotPurchased });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};