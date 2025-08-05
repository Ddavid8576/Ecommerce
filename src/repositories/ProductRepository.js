class ProductRepository {
    constructor(dao) {
      this.dao = dao;
    }
  
    async create(productData) {
      return await this.dao.create(productData);
    }
  
    async findById(id) {
      return await this.dao.findById(id);
    }
  
    async update(id, updates) {
      return await this.dao.update(id, updates);
    }
  
    async delete(id) {
      return await this.dao.delete(id);
    }
  }
  
  module.exports = ProductRepository;