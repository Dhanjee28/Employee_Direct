
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../config/database');

class AuthController {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username, email, and password are required',
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long',
        });
      }

      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        return res.status(400).json({
          success: false,
          message: 'Username already exists',
        });
      }

      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const userCount = await User.count();

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role: userCount === 0 ? 'admin' : 'user',
      });

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username and password are required',
        });
      }

      const user = await User.findOne({ where: { username } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
      );

      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async me(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ['id', 'username', 'email', 'role'],
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      res.json({
        success: true,
        user,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

module.exports = new AuthController();