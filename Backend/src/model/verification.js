const { DataTypes, Model } = require('sequelize');
const sequelize = require('../lib/database/connection');

class Varification extends Model { };

Varification.init({
  _id_user: {
    type: DataTypes.STRING,
    allowNull: false
  },

  id_user_access_level: {
    type: DataTypes.INTEGER,
  },

  token: {
    type: DataTypes.STRING,
  },

  verification_code: {
    type: DataTypes.STRING,
    defaultValue: null
  },

  datetime_generated: {
    type: DataTypes.DATE
  }


}, {
  timestamps: false,
  sequelize,
  modelName: 'Verifications',
})




module.exports = { Varification };
