const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('spotiapp', {
        token: {
            type: DataTypes.STRING,

        }
    })
}