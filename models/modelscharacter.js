const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Character = sequelize.define('character', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    attributes: {
        type: DataTypes.JSON,
        allowNull: false
    },
    important_details: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = Character;
