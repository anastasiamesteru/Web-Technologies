import express from 'express';
import bcrypt from 'bcrypt';
import { createUser, getUserByEmailAndCheckPassword } from '../models/user.js';

const accountRoutes = express.Router();

accountRoutes.use(require('express-session')({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Team member login route
accountRoutes.route('/teammember/login').post(async (req, res) => {
  return await loginHandler(req, res, 'teammember');
});

// Tester login route
accountRoutes.route('/tester/login').post(async (req, res) => {
  return await loginHandler(req, res, 'tester');
});

// Team member register route
accountRoutes.route('/teammember/register').post(async (req, res) => {
  return await registerHandler(req, res, 'teammember');
});

// Tester register route
accountRoutes.route('/tester/register').post(async (req, res) => {
  return await registerHandler(req, res, 'tester');
});

// Validate session route
accountRoutes.route('/validate-session').get((req, res) => {
  if (req.session.user) {
    return res.status(200).json({ message: 'Valid session', user: req.session.user });
  } else {
    return res.status(401).json('No valid session');
  }
});

// Login handler for both user
async function loginHandler(req, res, userType) {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json('Bad Request');

  try {
    const user = await getUserByEmailAndCheckPassword(userType, email, password);

    req.session.user = user;

    return res.status(200).json({ user, message: `${userType.charAt(0).toUpperCase() + userType.slice(1)} login successful` });
  } catch (e) {
    console.warn(e.stack);
    return res.status(500).json(e.message);
  }
}

// Register handler for both users
async function registerHandler(req, res, userType) {
  const { name, email, password, repeatPassword } = req.body;

  if (!name || !email || !password || !repeatPassword) return res.status(400).json('Bad Request');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json('Invalid email format');
  }

  // Password validation
  if (password !== repeatPassword) {
    return res.status(400).json('Passwords do not match');
  }

  if (password.length < 8) {
    return res.status(400).json('Password must be at least 8 characters long');
  }

  // Encrypt password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await createUser(userType, { name, email, password: hashedPassword });

    return res.status(201).json(user);
  } catch (e) {
    return res.status(500).json(e.message);
  }
}

export default accountRoutes;
