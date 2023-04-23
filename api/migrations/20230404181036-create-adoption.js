'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Adoptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tutor_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Tutors', key: 'id' },
      },
      pet_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Pets', key: 'id' },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Adoptions');
  },
};
