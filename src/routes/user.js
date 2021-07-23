const { Router } = require('express');
const { getToken } = require('../controllers/user.js')

const router = Router();

router.get('/token', getToken);