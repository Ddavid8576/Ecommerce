const UserRepository = require('../repositories/UserRepository');
const UserMongoDAO = require('../dao/mongodb/UserMongoDAO');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserDTO = require('../dtos/UserDTO');
const ResetToken = require('../models/ResetToken');
const { sendResetPasswordEmail } = require('../services/emailService');
const crypto = require('crypto');

const userRepository = new UserRepository(new UserMongoDAO());

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;
    // Validar que el rol sea 'user' o 'admin'
    const validRoles = ['user', 'admin'];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ error: 'Rol inválido. Use "user" o "admin".' });
    }
    const user = await userRepository.create({
      first_name,
      last_name,
      email,
      age,
      password,
      role: role || 'user', // Usa el rol enviado o 'user' por defecto
    });
    const userDTO = new UserDTO(user);
    res.json({ message: 'Usuario creado', user: userDTO });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login exitoso', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.current = async (req, res) => {
  try {
    const user = await userRepository.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const userDTO = new UserDTO(user);
    res.json(userDTO);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userRepository.findAll();
    const usersDTO = users.map(user => new UserDTO(user));
    res.json(usersDTO);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userRepository.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const userDTO = new UserDTO(user);
    res.json(userDTO);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = await userRepository.update(id, updates);
    const userDTO = new UserDTO(user);
    res.json({ message: 'Usuario actualizado', user: userDTO });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userRepository.delete(req.params.id);
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userRepository.findByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hora
    await ResetToken.create({ userId: user._id, token, expiresAt });
    await sendResetPasswordEmail(email, token);
    res.json({ message: 'Correo de restablecimiento enviado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const resetToken = await ResetToken.findOne({ token });
    if (!resetToken || resetToken.expiresAt < new Date()) {
      return res.status(400).json({ error: 'Token inválido o expirado' });
    }
    const user = await userRepository.findById(resetToken.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    // Evitar comparar la nueva contraseña con la actual si no es necesario
    // const isSamePassword = await user.comparePassword(newPassword);
    // if (isSamePassword) {
    //   return res.status(400).json({ error: 'La nueva contraseña no puede ser igual a la anterior' });
    // }
    user.password = newPassword; // El middleware pre('save') encriptará la contraseña
    await userRepository.update(user._id, user);
    await ResetToken.deleteOne({ token });
    res.json({ message: 'Contraseña restablecida' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};