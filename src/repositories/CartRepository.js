class CartRepository {
    constructor(dao) {
      this.dao = dao;
    }
  
    async create(cartData) {
      return await this.dao.create(cartData);
    }
  
    async findByUserId(userId) {
      return await this.dao.findByUserId(userId);
    }
  
    async update(id, updates) {
      return await this.dao.update(id, updates);
    }
  }
  
  module.exports = CartRepository;