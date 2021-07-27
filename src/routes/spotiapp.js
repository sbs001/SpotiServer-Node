const { Router } = require('express');
const { getNewReleases, getArtists, getArtistById, getTopTracks } = require('../controllers/spotiapp.js')

const router = Router();

router.get('/new-releases', getNewReleases);
router.get('/:artist', getArtists);
router.get('/artist/:id', getArtistById);
router.get('/top-tracks/:id', getTopTracks)

module.exports = router;