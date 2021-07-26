const { Router } = require('express');
const { getToken } = require('../controllers/spotiapp.js')

const router = Router();

router.get('/token', getToken);

module.exports = router;