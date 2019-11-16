
const express = require('express');
const router  = express.Router();

const { User } = require('../../src/models');

// router.get('/:id?', require('./service/find'));
// router.post('/', require('./service/create'));
// router.put('/:id', require('./service/update'));
// router.patch('/:id', require('./service/update'));
// router.delete('/:id', require('./service/delete'));
router.get('/', async (req, res) => {
    //const users = await User.findAll()
    //res.send([])
    const users = await User.findAll()
    res.send(users)
    
})


module.exports = router;