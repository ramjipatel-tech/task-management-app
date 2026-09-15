import { query } from '../config/database.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../config/email.js';

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    const existingUser = await query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await query(
      'INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
      [name, email, hashedPassword]
    );

    const newUser = await query('SELECT id, name, email FROM users WHERE email = ?', [email]);
    const token = generateToken(newUser[0]);

    // Send welcome email
    await sendEmail({
      to: email,
      subject: 'Welcome to TaskFlow',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome, ${name}!</h2>
          <p>Your account has been successfully created on TaskFlow.</p>
          <p>Start managing your tasks efficiently and boost your productivity.</p>
          <p style="margin-top: 30px; color: #666; font-size: 12px;">© 2026 Ramji Patel. All Rights Reserved.</p>
        </div>
      `,
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: newUser[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const users = await query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const user = users[0];
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await query(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      user: user[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required',
      });
    }

    await query(
      'UPDATE users SET name = ?, updated_at = NOW() WHERE id = ?',
      [name, userId]
    );

    const updatedUser = await query(
      'SELECT id, name, email FROM users WHERE id = ?',
      [userId]
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};
