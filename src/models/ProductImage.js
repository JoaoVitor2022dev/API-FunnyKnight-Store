const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn'); 

const ProductImagem = sequelize.define('imagem', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ProductImagem;