const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, name, lastname, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'El usuario ya existe' });

    user = new User({
      username,
      name,
      lastname,
      email,
      password,
    });

    await user.save();

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('Cash-Token', token, { httpOnly: true, maxAge: 3600000 });
    res.status(201).json({ msg: 'Usuario creado correctamente' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al crear el usuario' });
    console.log(err);
  }
});

module.exports = router;