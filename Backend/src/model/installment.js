const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../lib/database/connection');

const Installment = sequelize.define('Land_installmental_payments', {
  _id_user: {
    type: DataTypes.STRING,
    allowNull: false
  },

  court_name: {
    type: DataTypes.STRING,
  },

  price_per_plot: {
    type: DataTypes.INTEGER,
  },

  monthly_installmental_pay: {
    type: DataTypes.INTEGER,
  },

  payment_wo_installment: {
    type: DataTypes.INTEGER,
  },

  paid_months: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  installment_months: {
    type: DataTypes.INTEGER
  },

  interest: {
    type: DataTypes.INTEGER
  },

  date: {
    type: DataTypes.DATE,
  },

  matured_date: {
    type: DataTypes.DATE,
  }

}, {
  timestamps: false
})

const TerraceInstallment = sequelize.define('Terrace_installmental_payments', {
  _id_user: {
    type: DataTypes.STRING,
    allowNull: false
  },

  terrace_name: {
    type: DataTypes.STRING,
  },

  price_per_plot: {
    type: DataTypes.INTEGER,
  },

  monthly_installmental_pay: {
    type: DataTypes.INTEGER,
  },

  payment_wo_installment: {
    type: DataTypes.INTEGER,
  },

  paid_months: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  installment_months: {
    type: DataTypes.INTEGER
  },

  interest: {
    type: DataTypes.INTEGER
  },

  date: {
    type: DataTypes.DATE,
  },

  matured_date: {
    type: DataTypes.DATE,
  }

}, {
  timestamps: false
})





module.exports = { Installment, TerraceInstallment };
