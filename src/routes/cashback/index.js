const express = require('express');
const router  = express.Router();
const request = require('request');
const { GB_API } = require('../../helpers/constants')

router.get('/status', (req, res) => { 
  
  request(GB_API, function (error, response, body) {
    
    if (!error && response.statusCode == 200) {
      const cashBack = JSON.parse(body); 
      res.send({
        acumulatedCashback: cashBack.body.credit
      })
    }

  })
})

module.exports = router;