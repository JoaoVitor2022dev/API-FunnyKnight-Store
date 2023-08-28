const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn'); 

const AdminUser = sequelize.define('AdminUser', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
});

module.exports = AdminUser;