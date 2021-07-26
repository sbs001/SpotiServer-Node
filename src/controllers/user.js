const { User } = require('../../db.js');
const axios = require('axios');

require('dotenv').config();
const {
    CLIENT_ID,
    CLIENT_SECRET
} = process.env

const getToken = async(req, res, next) => {


    const actualToken = await User.findAll();

    if (((new Date - actualToken[0].dataValues.createdAt) / 60000) < 59)
        return res.sendStatus(200);

    if (actualToken.length)
        await User.destroy({
            where: {
                token: actualToken[0].dataValues.token
            }
        })

    try {

        const token = await axios({
            url: 'https://accounts.spotify.com/api/token',
            method: 'post',
            params: {
                grant_type: 'client_credentials'
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            auth: {
                username: CLIENT_ID,
                password: CLIENT_SECRET
            }
        })


        User.create({ token: token.data.access_token });

        return res.sendStatus(200)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    getToken
}