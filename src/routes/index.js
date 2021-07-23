const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    return res.send('SpotyServer /')
})

module.exports = router