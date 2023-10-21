'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
    dob: DataTypes.DATE,
    gender: DataTypes.STRING,
    contact: DataTypes.INTEGER,
    parentContact: DataTypes.STRING,
    education: DataTypes.STRING,
    itLevel: DataTypes.STRING,
    courses: DataTypes.STRING,
    fees: DataTypes.INTEGER,
    paidFees: DataTypes.INTEGER,
    couponCode: DataTypes.STRING,
    admissionDate: DataTypes.DATE,
    lastFeesDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Student',
     // paranoid :
     // underscored :
  });
  return Student;
};