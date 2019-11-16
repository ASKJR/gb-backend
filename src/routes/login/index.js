const express = require('express');
const router  = express.Router();
const { User } = require('../../models');
const { check, validationResult } = require('express-validator');


const loginValidations = [
  check('email').isEmail(),
  check('password').isLength({ min: 6})
]
// se o login for completado com sucesso, retorna o usuário, caso contrário, retorna null
router.post('/', loginValidations, async (req, res) => {
  
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(200).json(null)
  }

  const { email, password} = req.body;

  const loggedUser = await User.findOne({
    where: {
      email,
      password,
    }
  })

  return res.json(loggedUser)
})


module.exports = router;