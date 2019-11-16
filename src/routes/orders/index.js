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

router.put('/', [check('id').isNumeric(), orderValidations], async (req, res) => {
  
  const errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  
  const { id, cod, value, date, cpf } = req.body;

  const user = await User.findOne({
    where: {
      cpf
    }
  })

  if (!user) {
    return res.status(422).json({ errors: "CPF inválido" });
  }

  const order = await Order.findOne({
    where: {
      id,
      status: ORDER_STATUS_VALIDATION
    }
  });

  if (!order) {
    return res.status(422).json({ errors: "Compra inválida para atualização" });
  }

  const updatedOrder = await order.update({
    cod,
    user_id: user.id,
    value,
    date
  })

  return res.send(updatedOrder)

});

router.delete('/', [check('id').isNumeric()], async (req, res) => {
  
  const errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  
  const { id } = req.body;

  const order = await Order.findOne({
    where: {
      id,
      status: ORDER_STATUS_VALIDATION
    }
  });

  if (!order) {
    return res.status(422).json({ errors: "Não foi possível deletar essa compra." });
  }

  order.destroy();

  return res.status(200).json({ msg: "Compra excluída com sucesso!" });

});


module.exports = router;