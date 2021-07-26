const { Spotiapp } = require('../../db.js');
const axios = require('axios');

require('dotenv').config();
const {
    CLIENT_ID,
    CLIENT_SECRET
} = process.env


const getToken = async() => {

    const actualToken = await Spotiapp.findAll();

    if (actualToken.length) {
        if (((new Date - actualToken[0].dataValues.createdAt) / 60000) < 59)
            return actualToken[0].dataValues.token;

        if (actualToken.length)
            await Spotiapp.destroy({ where: { token: actualToken[0].dataValues.token } })
    }
    try {
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

const getNewRealses = async(req, res, next) => {
    console.log(await getToken());
    res.sendStatus(200)
}

module.exports = {
    getNewRealses
}