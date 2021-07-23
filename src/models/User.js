const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        token: {
            type: DataTypes.STRING,

        }
    })
}