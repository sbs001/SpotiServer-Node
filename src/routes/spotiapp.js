const { Router } = require('express');
const { getNewReleases, getArtists, getArtistById } = require('../controllers/spotiapp.js')

const router = Router();

router.get('/new-releases', getNewReleases);
router.get('/:artist', getArtists);
router.get('/artist/:id', getArtistById);


module.exports = router;