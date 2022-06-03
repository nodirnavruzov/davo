const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');

const doctorTypeModel = sequelize.define('doctor_type', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  type: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  }
},
{
  getterMethods: {
    deleteDates() {
      var values = Object.assign({}, this.get());
      delete values.createdAt;
      delete values.updatedAt;
      return values;
    }
  },
});


module.exports = sequelize.model('doctor_type', doctorTypeModel) 
