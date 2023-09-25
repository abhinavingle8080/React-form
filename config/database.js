// config/database.js
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql', // Use your database dialect here (postgres, mysql, sqlite)
    database: 'sdm',
    username: 'root',
    password: '1289',
    host: 'localhost',
    port: 3306
});

module.exports = sequelize;
