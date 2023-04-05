const Services = require('./Services');
const PetsServices = require('./PetsServices');
const database = require('../models');

class AdoptionsServices extends Services{
    constructor(){
        super('Adoption');
        this.pets = new PetsServices();
    }

    async create(data, shelter_id){
        const checkPetShelter = await this.pets.findOneFullScope({id: Number(data.pet_id)});
        if(checkPetShelter.shelter_id !== Number(shelter_id)) throw new Error("esse pet não pertence a esse abrigo");
        if(checkPetShelter.adopted !== false) throw new Error("esse pet já foi adotado");
        await database.sequelize.transaction(async transaction => {
            await super.create(data, transaction);
            await this.pets.update({adopted: true}, {id: Number(data.pet_id)}, transaction)
        });
        return this.pets.findOneFullScope({id: Number(data.pet_id)});
    }

    async destroy(adoption, shelter_id){
        const findPetAdopted = await this.pets.findOneFullScope({id: Number(adoption.pet_id)})
        if(findPetAdopted.shelter_id !== Number(shelter_id)) throw new Error("esse pet não pertence a esse abrigo");
        return await database.sequelize.transaction(async transaction => {
            await this.pets.updateFullScope({adopted: false}, {id: Number(adoption.pet_id)}, transaction)
            await super.destroy(adoption.id, transaction);
        });
    }
}

module.exports = AdoptionsServices;