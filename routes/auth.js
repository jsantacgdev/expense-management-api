const express = require('express');
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
    
    res.status(201).json({ msg: 'Usuario creado correctamente' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al crear el usuario' });
    console.log(err);
  }
});

module.exports = router;