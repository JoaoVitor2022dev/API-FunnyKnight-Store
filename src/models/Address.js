const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');
const User = require('./User'); // Certifique-se de que o caminho está correto

const Address = sequelize.define('Address', {
    street: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    UserId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

Address.belongsTo(User, { foreignKey: 'UserId', as: 'user' });
User.hasOne(Address);

module.exports = Address;