const { AdoptionsServices } = require('../services');

const adoptionServices = new AdoptionsServices();

class AdoptionsController {
  // creates an adoption and updates the pet it is related to
  static async createAdoption(req, res) {
    const { shelterId, petId } = req.params;
    const adoptionInfo = req.body;
    try {
      const adoptionCreated = await adoptionServices.create(
        {
          pet_id: Number(petId),
          ...adoptionInfo,
        },
        shelterId,
      );
      return res.status(201).json(adoptionCreated);
    } catch (error) {
      if (error.message === 'petDoesNotExist') return res.status(400).json({ msg: 'esse pet não existe' });
      if (error.message === 'petDoesntBelongToShelter') return res.status(400).json({ msg: 'esse pet não pertence a esse abrigo' });
      if (error.message === 'petContainsAdoption') return res.status(400).json({ msg: 'esse pet já foi adotado' });
      return res.status(500).json(error.message);
    }
  }

  static async deleteAdoption(req, res) {
    const { shelterId, id } = req.params;
    try {
      const adoptionExists = await adoptionServices.findOne({ id: Number(id) });
      if (adoptionExists === null) throw new Error('UnexistentId'); // guarantees adoption exists before trying to delete it
      await adoptionServices.destroy(adoptionExists, shelterId);
      return res.status(200).json({ msg: `id ${id} deletado com sucesso` });
    } catch (error) {
      if (error.message === 'UnexistentId') return res.status(400).json({ msg: 'id não existente' });
      if (error.message === 'petDoesntBelongToShelter') return res.status(400).json({ msg: 'esse pet não pertence a esse abrigo' });
      return res.status(500).json(error.message);
    }
  }
}

module.exports = AdoptionsController;
