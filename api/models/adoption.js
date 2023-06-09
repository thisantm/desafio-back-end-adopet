'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Adoption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Adoption.belongsTo(models.Tutor, {
        foreignKey: 'tutor_id',
      });
      Adoption.belongsTo(models.Pet, {
        foreignKey: 'pet_id',
      });
    }
  }
  Adoption.init({
  }, {
    sequelize,
    modelName: 'Adoption',
    defaultScope: {
      attributes: {
        exclude: ['updatedAt'],
      },
    },
  });
  return Adoption;
};
