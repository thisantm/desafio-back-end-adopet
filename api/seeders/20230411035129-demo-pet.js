'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Pets', [
      {
        id: 1,
        shelter_id: 1,
        name: 'Spot',
        description: 'to be discovered',
        adopted: false,
        age: '2 anos',
        address: 'no address',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        shelter_id: 1,
        name: 'Buddy',
        description: 'to be discovered',
        adopted: true,
        age: '3 anos',
        address: 'no address',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        shelter_id: 2,
        name: 'Spark',
        description: 'to be discovered',
        adopted: false,
        age: '6 anos',
        address: 'no address',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Pets', null, {});
  },
};
