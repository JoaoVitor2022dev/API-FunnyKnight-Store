const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn'); 
const AdminUser = require("./AdminUser");

const Product = sequelize.define('Product', {
    description: {
        type: DataTypes.STRING
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productSize: {
        type: DataTypes.STRING
    },
    color: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    availability: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    clothingAge: {
        type: DataTypes.INTEGER
    },
    image: {
        type: DataTypes.STRING
    },
    productCode: {
        type: DataTypes.STRING,
        unique: true 
    },
}, {
    timestamps: true,
});

// Relacionamento entre Product e AdminUser
Product.belongsTo(AdminUser, { foreignKey: 'AdminUserId', as: 'adminUser' });
AdminUser.hasMany(Product, { foreignKey: 'AdminUserId', as: 'products' });

module.exports = Product;