const express = require('express');
const router  = express.Router();
const { User } = require('../../models');
const { check, validationResult } = require('express-validator');
const { auth } = require('../../middlewares/auth')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const userValidations = [
  check('name').isLength({ min: 1}),
  check('cpf').isLength({ min: 1}),
  check('email').isEmail(),
  check('password').isLength({ min: 6})
]

router.get('/', auth, async (req, res) => {
  const users = await User.findAll()
  res.send(users)    
})

router.post('/', userValidations, async (req, res) => {
  
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { name, cpf, email, password} = req.body;

  let user = await User.findOne({
    where: {
      [Op.or]: [{email},{cpf}]
    }
  })

  if (user) {
    return res.status(422).json({ errors: "Usuário já cadastrado" })
  }

  user = await User.create({
    name,
    cpf,
    email,
    password
  })

  return res.json(user)
})


module.exports = router;