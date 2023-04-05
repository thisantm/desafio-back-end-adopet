const Services = require('./Services');
const database = require('../models');

class PetsServices extends Services{
    constructor(){
        super('Pet');
    }

    async findOneFullScope(where = {}){
        return database[this.modelName].scope("includeAll").findOne({where: {...where}, include: [{model: database.Adoption}]});
    }

    async updateFullScope(data, where = {}, transaction = {}){
        return database[this.modelName].scope("includeAll").update(data, {where: {...where}}, transaction);
    }
}

module.exports = PetsServices;