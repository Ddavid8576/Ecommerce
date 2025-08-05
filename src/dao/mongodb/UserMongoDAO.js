const User = require('../../models/User');

class UserMongoDAO {
  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async findById(id) {
    return await User.findById(id).select('-password');
  }

  async findAll() {
    return await User.find().select('-password');
  }

  async update(id, updates) {
    const user = await User.findById(id);
    if (!user) throw new Error('Usuario no encontrado');
    Object.assign(user, updates);
    return await user.save();
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = UserMongoDAO;