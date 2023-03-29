'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tutores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tutores.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg : "Nome não pode estar vazio"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg : "Formato de e-mail invalido"
        }
      }
    },
    senha: {
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
    modelName: 'Tutores',
  });
  return Tutores;
};