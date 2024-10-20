const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
const generateAccessToken = require('../utils/TokenUtils');

// LOGIN
router.post('/login', async (req, res) => {

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' });

    
    const accessToken = generateAccessToken(user);

    res.status(200).json({ msg: 'Usuario conectado correctamente', accessToken: accessToken, 
      user: { 
        id: user.id,
        username: user.username, 
        name: `${user.name} ${user.lastname}`}});
  } catch (err) {
    res.status(500).json({ msg: 'Error al conectar con el servidor' });
    console.log(err);
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  res.status(200).json({ msg: 'Sesión cerrada' });
});

module.exports = router;