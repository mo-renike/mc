const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../lib/database/connection');

class Terrace extends Model { };
class Estate extends Model { };
class Court extends Model { }

Terrace.init({

  _id_user: {
    type: DataTypes.STRING,
    allowNull: false
  },

  terrace_price: {
    type: DataTypes.DECIMAL(13, 2),
  },

  terrace_name: {
    type: DataTypes.STRING
  },

  no_estates: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  interest_rate: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  max_month: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }

}, {
  sequelize,
  modelName: 'Terraces',
})


Estate.init({

  _id_user: {
    type: DataTypes.STRING,
    allowNull: false
  },

  terrace_name: {
    type: DataTypes.STRING
  },

  estate_name: {
    type: DataTypes.STRING,
  },

  location: {
    type: DataTypes.STRING,
  },

  description: {
    type: DataTypes.STRING,
    validate: {
      len: [0, 150],
    }
  },

  land_size: {
    type: DataTypes.STRING,
    allowNull: false
  },

  no_courts: {
    type: DataTypes.INTEGER
  },

  layout: {
    type: DataTypes.STRING,
    allowNull: false
  },

  layout_t: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  sequelize,
  modelName: 'Terrace_Estates',
});


Court.init({

  _id_user: DataTypes.STRING,

  estate_name: {
    type: DataTypes.STRING,
  },

  terrace_name: {
    type: DataTypes.STRING
  },

  description: {
    type: DataTypes.STRING,
    validate: {
      len: [0, 150],
    }
  },

  court_name: {
    type: DataTypes.STRING,
  },

  no_unit_available: {
    type: DataTypes.INTEGER
  },

  layout: {
    type: DataTypes.STRING,
    allowNull: false
  },

  layout_t: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  sequelize,
  modelName: 'Terrace_Courts',
});


module.exports = { Terrace, Estate, Court };
