const express = require('express');
const router = express.Router();
const User = require('../models/users');

// CREATE USER
router.post('/', async (req, res) => {
  try {
    const { name, email, password, deliveryAddress } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      name,
      email,
      password,
      deliveryAddress,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
