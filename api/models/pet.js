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
    name: {
      type: DataTypes.STRING,
      is: {
        args: "^[a-zA-ZÀ-Ùà-ù'].+(?:[a-zA-ZÀ-Ùà-ù']+)+$/",
        msg: "nome pode conter apenas caracteres validos"
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg : "descrição não pode estar vazia"
        }
      }
    },
    adopted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    age: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: "(^[0-9]{0,2}).+",
          msg: "idade invalida"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg : "endereço não pode estar vazio"
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      validate:{
        isUrl: {
          args: true,
          msg: "imagem tem que ser uma url"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Pet',
    defaultScope: {
      where: {
        adopted: false
      }
    },
    scopes: {
      includeAll: {
        where: {}
      }
    }
  });
  return Pet;
};