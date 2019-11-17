const express = require('express');
const router  = express.Router();
const { User } = require('../../models');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

require("dotenv-safe").config();


const loginValidations = [
  check('email').isEmail(),
  check('password').isLength({ min: 6})
]
// se o login for completado com sucesso, retorna o usuário, caso contrário, retorna null
router.post('/', loginValidations, async (req, res) => {
  
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(500).json({erros:"Login inválido"});
  }

  const { email, password} = req.body;

  const loggedUser = await User.findOne({ where: { email} })

  if (!loggedUser) {
    return res.status(500).json({erros:"Login inválido"});
  } else if (!await loggedUser.validPassword(password)) {
    return res.status(500).json({erros:"Login inválido"});
  }

  const { id } = loggedUser;

  var token = jwt.sign({ id }, process.env.SECRET_JWT, {
    expiresIn: 60 * 60// expira em 1h
  });

  return res.status(200).send({ auth: true, token: token });

})


module.exports = router;