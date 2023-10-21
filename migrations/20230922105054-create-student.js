'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      dob: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.INTEGER
      },
      parentContact: {
        type: Sequelize.STRING
      },
      education: {
        type: Sequelize.STRING
      },
      itLevel: {
        type: Sequelize.STRING
      },
      courses: {
        type: Sequelize.STRING
      },
      fees: {
        type: Sequelize.INTEGER
      },
      paidFees: {
        type: Sequelize.INTEGER
      },
      couponCode: {
        type: Sequelize.STRING
      },
      admissionDate: {
        type: Sequelize.DATE
      },
      lastFeesDate: {
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,  //
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,  //
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('students');
  }
};