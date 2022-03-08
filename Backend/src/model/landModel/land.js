const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../lib/database/connection');

class Land extends Model { };
class Estate extends Model { };
class Close extends Model { }

Land.init({

  _id_user: {
    type: DataTypes.STRING,
    allowNull: false
  },

  land_price: {
    type: DataTypes.DECIMAL(13, 2),
  },

  land_name: {
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
  modelName: 'Lands',
})


Estate.init({

  _id_user: {
    type: DataTypes.STRING,
    allowNull: false
  },

  land_name: {
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
  modelName: 'Land_Estates',
});


Close.init({

  _id_user: DataTypes.STRING,

  estate_name: {
    type: DataTypes.STRING,
  },

  land_name: {
    type: DataTypes.STRING
  },

  description: {
    type: DataTypes.STRING,
    validate: {
      len: [0, 150],
    }
  },

  close_name: {
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
  modelName: 'Land_Close',
});


module.exports = { Land, Estate, Close };
