const Services = require('./Services');
const database = require('../models');

class PetsServices extends Services{
    constructor(){
        super('Pet');
    }

    async findOneFullScope(where = {}){
        return database[this.modelName].scope("includeAll").findOne({where: {...where}, include: [{model: database.Adoption}]});
    }

    async update(data, where = {}, transaction = {}){ // the reason this exists is because without the scope and if the pet is adopted the controller will send a positive despite the pet not being updated in the database
        return database[this.modelName].scope("includeAll").update(data, {where: {...where}}, transaction);
    }

    async destroy(where = {}, transaction = {}){ // the reason this exists is because without the scope and if the pet is adopted the controller will send a positive despite the pet not being deleted from the database
        return database[this.modelName].scope("includeAll").destroy({where: {...where}}, transaction);
    }
}

module.exports = PetsServices;