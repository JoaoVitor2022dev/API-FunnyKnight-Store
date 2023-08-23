const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn'); 

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
    }
}, {
    timestamps: true,
});

Product.belongsTo(User);
User.hasMany(Product);

module.exports = Product;