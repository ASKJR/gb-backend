const jwt = require('jsonwebtoken');
require("dotenv-safe").config();

const auth = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  
  if (!token) {
    return res.status(401).send({ auth: false, message: 'Token não fornecido' });
  } 
  
  jwt.verify(token, process.env.SECRET_JWT, function(err, decoded) {
    
    if (err) {
      return res.status(500).send({ auth: false, message: 'Token inválido' });
    } 
    
    req.user_id = decoded.id;
    next();
  });   
}
  
module.exports = {
  auth,
}