import express from 'express';
import bcrypt from 'bcrypt';
import session from 'express-session';
import { createUser, getUserByEmailAndCheckPassword } from '../models/user.js';
import tester from '../models/tester.js';
import teamMember from '../models/teammember.js';

const accountRoutes = express.Router();

accountRoutes.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Register tester route
accountRoutes.route('/tester/register').post(async (req, res) => {
  return await registerHandler(req, res, tester);
});

// Register teammember route
accountRoutes.route('/teammember/register').post(async (req, res) => {
  return await registerHandler(req, res, teamMember);
});

// Login tester route
accountRoutes.route('/tester/login').post(async (req, res) => {
  return await loginHandler(req, res, tester);
});

// Login teammember route
accountRoutes.route('/teammember/login').post(async (req, res) => {
  return await loginHandler(req, res, teamMember);
});

// Validate session route
accountRoutes.route('/validate-session').get((req, res) => {
  if (req.session.user) {
    return res.status(200).json({ message: 'Valid session', user: req.session.user });
  } else {
    return res.status(401).json('No valid session');
  }
});

async function registerHandler(req, res, userType) {
  const { name, email, password } = req.body;

  // Check for missing fields
  if (!name || !email || !password) {
    return res.status(400).json('Bad Request');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json('Invalid email format');
  }

  if (password.length < 8) {
    return res.status(400).json('Password must be at least 8 characters long');
  }

  try {
    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with encrypted password and userType
    const user = await createUser({ name, email, password: hashedPassword, userType });
    return res.status(201).json(user);
  } catch (e) {
    console.error("Error during registration:", e);
    return res.status(500).json('Error during registration');
  }
}
// Login handler
async function loginHandler(req, res, userType) {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json('Bad Request');

  try {
    const user = await getUserByEmailAndCheckPassword(userType, email, password);

    req.session.user = {
      ...user,
      userType: userType,
    };

    return res.status(200).json({ user, message: 'Login successful' });
  } catch (e) {
    console.warn(e.stack);
    return res.status(500).json(e.message);
  }
}


export default accountRoutes;
