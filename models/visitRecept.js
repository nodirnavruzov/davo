const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');
const doctor = require('./doctor')
const visit = require('./visit')
const patient = require('./patient')
const recept = require('./recept')

const visitReceptModel = sequelize.define('visit_recept', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },

  patient_id: {
    type: DataTypes.INTEGER,
    references: {
      model: patient,
      key: 'id',
    }
  },

  visit_id: {
    type: DataTypes.INTEGER,
    references: {
      model: visit,
      key: 'id',
    }
  },

  doctor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: doctor,
      key: 'id',
    },
  },

  recept_id: {
    type: DataTypes.INTEGER,
    references: {
      model: recept,
      key: 'id',
    }
  },
});

module.exports = sequelize.model('visit_recept', visitReceptModel) 

