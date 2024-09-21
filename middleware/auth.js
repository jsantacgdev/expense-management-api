const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ msg: 'No existe token, permiso noautorizado' });

  try {
    const decoded = jwt.verify(token, ProcessingInstruction.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido' });
    console.log(err);
  }
}

module.exports = auth;