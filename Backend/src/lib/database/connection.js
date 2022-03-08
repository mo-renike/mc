const config = require('config');
const { Sequelize } = require('sequelize');

const serverConfig = config.get('databaseConfig');

const sequelize = new Sequelize(serverConfig.databaseName, serverConfig.userName, serverConfig.password, {
  dialect: serverConfig.dialect,
  host: serverConfig.host,
  port: serverConfig.port,
  storage: serverConfig.storage
})

module.exports = sequelize;