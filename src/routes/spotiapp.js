const { Router } = require('express');
const { getNewRealses } = require('../controllers/spotiapp.js')

const router = Router();

router.get('/token', getNewRealses);

module.exports = router;