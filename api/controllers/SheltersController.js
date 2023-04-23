const { SheltersServices } = require('../services');

const shelterServices = new SheltersServices();

class SheltersController {
  // finds all shelters, doesnt show password because of defaultScope
  static async findAllShelters(req, res) {
    try {
      const shelters = await shelterServices.findAll();
      if (shelters.length === 0) return res.status(200).json({ msg: 'Não encontrado.' }); // if no shelter is found return a message "not found"
      return res.status(200).json(shelters);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  // finds one shelter by id, doesnt show password because of defaultScope
  static async findShelterById(req, res) {
    const { id } = req.params;
    try {
      const shelter = await shelterServices.findOne({ id: Number(id) });
      if (shelter === null) return res.status(200).json({ msg: 'Não encontrado.' }); // if shelter is not found return a message "not found"
      return res.status(200).json(shelter);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createShelter(req, res) {
    const shelter = req.body;
    try {
      if (shelter.password !== shelter.confirmPassword) throw new Error('passwordError'); // stops the creation of a new shelter if the password field does not equal the confirmPassword field
      const shelterCreated = await shelterServices.create(shelter);
      return res.status(201).json(shelterCreated);
    } catch (error) {
      if (error.message === 'passwordError') return res.status(400).json({ msg: 'senhas diferentes' });
      if (error.name === 'SequelizeUniqueConstraintError') return res.status(400).json({ msg: 'email já utilizado' });
      return res.status(500).json(error.message);
    }
  }

  static async updateShelter(req, res) {
    const newInfo = req.body;
    const { id } = req.body;
    try {
      if (newInfo.password !== null && newInfo.password !== newInfo.confirmPassword) throw new Error('passwordError'); // check if password has been changed, if it is then check if it equals to the second field confirmPassword
      await shelterServices.update(newInfo, { id: Number(id) });
      const shelterUpdated = await shelterServices.findOne({ id: Number(id) });
      return res.status(200).json(shelterUpdated);
    } catch (error) {
      if (error.message === 'passwordError') return res.status(400).json({ msg: 'senhas diferentes' });
      return res.status(500).json(error.message);
    }
  }

  // deletes a shelter ATTENTION: it will not delete the shelter if it has pets
  static async deleteShelter(req, res) {
    const { id } = req.params;
    try {
      const shelterExists = await shelterServices.findOne({ id: Number(id) });
      if (shelterExists === null) throw new Error('UnexistentId'); // guarantees shelter exists before trying to delete it
      await shelterServices.destroy({ id: Number(id) });
      return res.status(200).json({ msg: `id ${id} deletado com sucesso` });
    } catch (error) {
      if (error.message === 'UnexistentId') return res.status(400).json({ msg: 'id não existente' });
      return res.status(500).json(error.message);
    }
  }
}

module.exports = SheltersController;
