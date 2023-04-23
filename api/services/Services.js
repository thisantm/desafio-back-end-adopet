const database = require('../models');

class Services {
  constructor(modelName) {
    this.modelName = modelName;
  }

  async findAll(where = {}) {
    return database[this.modelName].findAll({ where: { ...where } });
  }

  async findOne(where = {}) {
    return database[this.modelName].findOne({ where: { ...where } });
  }

  async create(data, transaction = {}) {
    return database[this.modelName].create(data, transaction);
  }

  async update(data, where, transaction = {}) {
    return database[this.modelName].update(data, { where: { ...where } }, transaction);
  }

  async destroy(where, transaction = {}) {
    return database[this.modelName].destroy({ where: { ...where } }, transaction);
  }
}

module.exports = Services;
