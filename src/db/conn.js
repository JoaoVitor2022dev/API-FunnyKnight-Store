const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.HOST,
  username: process.env.USERNAME,  
  port: process.env.PORT_DB,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

try {
  sequelize.authenticate(); 
  console.log('Conectamos com A ORM no banco de dados...');
} catch (error) {
  console.log(`Não foi possivel conectar ${error}`);
}

module.exports = sequelize; 


