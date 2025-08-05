class UserRepository {
    constructor(dao) {
      this.dao = dao;
    }
  
    async create(userData) {
      return await this.dao.create(userData);
    }
  
    async findByEmail(email) {
      return await this.dao.findByEmail(email);
    }
  
    async findById(id) {
      return await this.dao.findById(id);
    }
  
    async findAll() {
      return await this.dao.findAll();
    }
  
    async update(id, updates) {
      return await this.dao.update(id, updates);
    }
  
    async delete(id) {
      return await this.dao.delete(id);
    }
  }
  
  module.exports = UserRepository;