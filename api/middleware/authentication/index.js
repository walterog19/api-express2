const jwt = require('jsonwebtoken');
const config = require('./../../../config');
const response = require('./../../lib/response');

const authentication = (req, res, next) => {
  console.log(config.jwTKey);
  const token = req.headers['x-access-token'];
  try {
    const decoded = jwt.verify(token, 'my-secret-key');
    const {
      id,
      username,
    } = decoded; /*extraer del token decodificado, el id y el username del usuario*/
    console.log(id);
    console.log(username);
    req.id = id; /*agregar al objeto request, el id del usuario recién obtenido*/
    req.username = username; /*agregar al objeto request, el username del usuario recién obtenido*/
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json(response(false, undefined, 'No autorizado'));
  }
};

module.exports = authentication;
