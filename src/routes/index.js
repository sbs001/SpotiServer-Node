const { default: axios } = require('axios');
const { Router } = require('express');
const user = require('./user.js');

const router = Router();

router.use('/user', user);


router.get('/', (req, res) => {
    return res.send('Welcome to /')
})

module.exports = router