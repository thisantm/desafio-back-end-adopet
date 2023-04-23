const Services = require('./Services');
const PetsServices = require('./PetsServices');
const database = require('../models');

class AdoptionsServices extends Services {
  constructor() {
    super('Adoption');
    this.pets = new PetsServices();
  }

  async create(data, shelterId) {
    const petAdopted = await this.pets.findOneFullScope({ id: Number(data.pet_id) });
    if (petAdopted === null) throw new Error('petDoesNotExist'); // check if pet exists
    if (petAdopted.shelterId !== Number(shelterId)) throw new Error('petDoesntBelongToShelter'); // check if pet is of the shelter that created the adoption
    if (petAdopted.adopted !== false) throw new Error('petContainsAdoption'); // check if pet already has been adopted

    // creates the adoption and updates the pet
    await database.sequelize.transaction(async (transaction) => {
      await super.create(data, transaction);
      await this.pets.update({ adopted: true }, { id: Number(data.pet_id) }, transaction);
    });
    // returns the full data of the pet with the adoption
    return this.pets.findOneFullScope({ id: Number(data.pet_id) });
  }

  async destroy(adoption, shelterId) {
    const findAdoptedPet = await this.pets.findOneFullScope({ id: Number(adoption.pet_id) });
    if (findAdoptedPet.shelterId !== Number(shelterId)) throw new Error('petDoesntBelongToShelter'); // check if pet is of the shelter that deleted the adoption
    // deletes the adoption and updates the pet
    return database.sequelize.transaction(async (transaction) => {
      await this.pets.update({ adopted: false }, { id: Number(adoption.pet_id) }, transaction);
      await super.destroy(adoption.id, transaction);
    });
  }
}

module.exports = AdoptionsServices;
