const { Router } = require('express');
const { getNewReleases, getArtists } = require('../controllers/spotiapp.js')

const router = Router();

router.get('/new-releases', getNewReleases);
router.get('/:artist', getArtists);


module.exports = router;