const { default: axios } = require('axios');
const { Router } = require('express');
const spotiapp = require('./spotiapp.js');

const router = Router();

router.use('/spotiapp', spotiapp);


router.get('/', (req, res) => {
    return res.send('Welcome to /')
})

module.exports = router