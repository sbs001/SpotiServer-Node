const { Spotiapp } = require('../../db.js');
const axios = require('axios');

const URL_BASE = "https://api.spotify.com/v1";

require('dotenv').config();
const {
    CLIENT_ID,
    CLIENT_SECRET
} = process.env


const getToken = async() => {
    try {

        const actualToken = await Spotiapp.findAll();

        if (actualToken.length) {
            if (((new Date - actualToken[0].dataValues.createdAt) / 60000) < 59)
                return actualToken[0].dataValues.token;

            if (actualToken.length)
                await Spotiapp.destroy({ where: { token: actualToken[0].dataValues.token } })
        }

        const token = await axios({
            url: 'https://accounts.spotify.com/api/token',
            method: 'post',
            params: { grant_type: 'client_credentials' },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            auth: {
                username: CLIENT_ID,
                password: CLIENT_SECRET
            }
        });

        Spotiapp.create({ token: token.data.access_token });
        return token.data.access_token;

    } catch (error) { console.log(error.data) }
};

const headers = async() => {
    try {

        return {
            'headers': {
                'Authorization': `Bearer ${await getToken()}`
            }
        }
    } catch (error) { console.log(error.data) }

}

const getNewReleases = async(req, res, next) => {
    try {
        const { data } = await axios.get(`${URL_BASE}/browse/new-releases`, await headers());
        res.send(data.albums.items);

    } catch (error) {
        res.status(400).send(error)
    }
}

const getArtists = async(req, res, next) => {
    try {
        const { data } = await axios.get(`${URL_BASE}/search?q=${req.params.artist}&type=artist&limit=15`, await headers());
        res.send(data.artists.items);

    } catch (error) {
        res.status(400).send(error)
    }
}

const getArtistById = async(req, res, next) => {
    try {
        const { data } = await axios.get(`${URL_BASE}/artists/${req.params.id}`, await headers());
        res.send(data);

    } catch (error) {
        res.status(400).send(error)
    }
}

const getTopTracks = async(req, res, next) => {

    try {
        const { data } = await axios.get(`${URL_BASE}/artists/${req.params.id}/top-tracks?market=es`, await headers());
        res.send(data.tracks);

    } catch (error) {
        res.status(400).send(error)
    }
}


module.exports = {
    getNewReleases,
    getArtists,
    getArtistById,
    getTopTracks
}