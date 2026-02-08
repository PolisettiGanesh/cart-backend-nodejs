const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// JOI VALIDATION SCHEMA
const createUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  deliveryAddress: Joi.string().min(5).required(),
});

// CREATE USER
router.post('/', async (req, res) => {
  try {
    // 1️⃣ Validate request body
    const { error } = createUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, password, deliveryAddress } = req.body;

    // 2️⃣ Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 3️⃣ Hash password
    const hashedPass = await bcrypt.hash(password, 10);

    // 4️⃣ Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPass,
      deliveryAddress,
    });

    const savedUser = await newUser.save();

    // 5️⃣ Generate JWT token
    const token = jwt.sign(
      { userId: savedUser._id, name: savedUser.name },
      process.env.JWT_KEY,
      { expiresIn: '2hr' }
    );

    // 6️⃣ Send response
    res.status(201).json({
      message: 'User created successfully',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check Login Details of User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    // 2. Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
      },
      process.env.JWT_KEY,
      { expiresIn: '2h' }
    );

    // 4. Send response
    res.status(200).json({
      message: 'Login successful',
      token,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;



















































//-------------------------------------------------
/*
const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
// CREATE USER
router.post('/', async (req, res) => {
  try {
    const { name, email, password, deliveryAddress } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPass = await bcrypt.hash(password,10);

    const newUser = new User({
      name,
      email,
      password:hashedPass,
      deliveryAddress,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

*/
