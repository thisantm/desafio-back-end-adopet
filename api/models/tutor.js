'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tutor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tutor.hasMany(models.Adoption, {
        foreignKey: "tutor_id"
      })
    }
  }
  Tutor.init({
    name: {
      type: DataTypes.STRING,
      is: {
        // args: "[^0-9].*/",
        args: "^[a-zA-ZÀ-Ùà-ù'].+(?:[a-zA-ZÀ-Ùà-ù']+)+$/",
        msg: "nome pode conter apenas caracteres validos"
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
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg : "Senha não pode estar vazia"
        }
      }
    },
    telephone: {
      type: DataTypes.STRING,
      is: "^\+(?:[0-9]●?){6,14}[0-9]$/"
    },
    city: DataTypes.STRING,
    aboutMe: {
      type: DataTypes.STRING,
      len: [1, 200]
    }
  }, {
    sequelize,
    modelName: 'Tutor',
    defaultScope: {
      attributes: {
        exclude: ["password"]
      }
    },
    scopes: {
      comSenha: {
        attributes: {
          include: ["password"]
        }
      }
    }
  });
  return Tutor;
};