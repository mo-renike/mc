
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../lib/database/connection');

class User extends Model { };

User.init({

  _id_user: DataTypes.STRING,

  first_name: {
    type: DataTypes.STRING
  },

  last_name: {
    type: DataTypes.STRING
  },

  user_email: {
    type: DataTypes.STRING
  },

  user_phone: {
    type: DataTypes.STRING
  },

  marital_status: {
    type: DataTypes.STRING,
  },

  nationality: {
    type: DataTypes.STRING,
  },

  date_of_birth: {
    type: DataTypes.STRING,
  },

  password: {
    type: DataTypes.STRING,
  },

  email_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  sequelize,
  modelName: 'Users',
})

module.exports = {
  User
}