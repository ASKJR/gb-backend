const express = require('express');
const router  = express.Router();
const { Order, User } = require('../../models');
const { check, validationResult } = require('express-validator');
const { ORDER_STATUS_VALIDATION, ORDER_STATUS_APPROVED, CPF_MASTER} = require('../../helpers/constants')


const orderValidations = [
  check('cod').isLength({ min: 1}),
  check('value').isNumeric(),
  check('date').isISO8601(),
  check('cpf').isLength({ min: 1}),
]

router.post('/', orderValidations, async (req, res) => {
  
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { cod, value, date, cpf } = req.body;

  const user = await User.findOne({
    where: {
        cpf
    }
  })

  if (!user) {
    return res.status(422).json({ errors: "CPF inválido" });
  }

  const status = (CPF_MASTER == cpf) ? ORDER_STATUS_APPROVED : ORDER_STATUS_VALIDATION;

  const order = await Order.create({
    cod,
    user_id: user.id,
    value,
    date,
    status
  });
  
  return res.json(order)
})


module.exports = router;