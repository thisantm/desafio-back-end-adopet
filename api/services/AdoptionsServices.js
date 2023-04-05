const Services = require('./Services');
const PetsServices = require('./PetsServices');
const database = require('../models');

class AdoptionsServices extends Services{
    constructor(){
        super('Adoption');
        this.pets = new PetsServices();
    }

    async create(data, shelter_id){
        const petAdopted = await this.pets.findOneFullScope({id: Number(data.pet_id)});                          // finds the pet to be adopted
        if(petAdopted === null) throw new Error("esse pet não existe");                                          // check if pet exists
        if(petAdopted.shelter_id !== Number(shelter_id)) throw new Error("esse pet não pertence a esse abrigo"); // check if pet is of the shelter that created the adoption
        if(petAdopted.adopted !== false) throw new Error("esse pet já foi adotado");                             // check if pet already has been adopted
        
        await database.sequelize.transaction(async transaction => { // creates the adoption and updates the pet
            await super.create(data, transaction);
            await this.pets.update({adopted: true}, {id: Number(data.pet_id)}, transaction);
        });
        return this.pets.findOneFullScope({id: Number(data.pet_id)}); // returns the full data of the pet with the adoption
    }

    async destroy(adoption, shelter_id){
        const findAdoptedPet = await this.pets.findOneFullScope({id: Number(adoption.pet_id)});                      // finds the pet that was
        if(findAdoptedPet.shelter_id !== Number(shelter_id)) throw new Error("esse pet não pertence a esse abrigo"); // check if pet is of the shelter that deleted the adoption
        return await database.sequelize.transaction(async transaction => {  // deletes the adoption and updates the pet
            await this.pets.update({adopted: false}, {id: Number(adoption.pet_id)}, transaction)
            await super.destroy(adoption.id, transaction);
        });
    }
}

module.exports = AdoptionsServices;