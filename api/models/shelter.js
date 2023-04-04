'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shelter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shelter.hasMany(models.Pet, {
        foreignKey: "shelter_id"
      })
    }
  }
  Shelter.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg : "Formato de e-mail invalido"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg : "Senha não pode estar vazia"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Shelter',
  });
  return Shelter;
};