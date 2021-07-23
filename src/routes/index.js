const { Router } = require('express');
const user = require('./user.js');

const router = Router();

router.get('/user', user);

router.get('/', (req, res) => {
    return res.send('SpotyServer /')
})

module.exports = router