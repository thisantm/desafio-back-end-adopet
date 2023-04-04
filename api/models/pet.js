'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pet.hasOne(models.Adoption, {
        foreignKey: "pet_id"
      }),
      Pet.belongsTo(models.Shelter, {
        foreignKey: "shelter_id"
      })
    }
  }
  Pet.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    adopted: DataTypes.BOOLEAN,
    age: DataTypes.STRING,
    address: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pet',
  });
  return Pet;
};