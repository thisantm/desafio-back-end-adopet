const { TutorsServices } = require('../services');

const tutorServices = new TutorsServices();

class TutorsController {
  // finds all tutors, doesnt show password because of defaultScope
  static async findAllTutors(req, res) {
    try {
      const tutors = await tutorServices.findAll();
      if (tutors.length === 0) return res.status(200).json({ msg: 'Não encontrado.' }); // if no tutor is found return a message "not found"
      return res.status(200).json(tutors);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  // finds one tutor by id, doesnt show password because of defaultScope
  static async findTutorById(req, res) {
    const { id } = req.params;
    try {
      const tutor = await tutorServices.findOne({ id: Number(id) });
      if (tutor === null) return res.status(200).json({ msg: 'Não encontrado.' }); // if the tutor is not found return a message "not found"
      return res.status(200).json(tutor);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createTutor(req, res) {
    const tutor = req.body;
    try {
      if (tutor.password !== tutor.confirmPassword) throw new Error('passwordError'); // stops the creation of a new tutor if the password field does not equal the confirmPassword field
      const tutorCreated = await tutorServices.create(tutor);
      return res.status(201).json(tutorCreated);
    } catch (error) {
      if (error.message === 'passwordError') return res.status(400).json({ msg: 'senhas diferentes' });
      if (error.name === 'SequelizeUniqueConstraintError') return res.status(400).json({ msg: 'email já utilizado' }); // prints the error message informing that email has already been used
      return res.status(500).json(error.message);
    }
  }

  static async updateTutor(req, res) {
    const newInfo = req.body;
    const { id } = req.body;
    try {
      if (newInfo.password !== null && newInfo.password !== newInfo.confirmPassword) throw new Error('passwordError'); // check if password has been changed, if it is then check if it equals to the second field confirmPassword
      await tutorServices.update(newInfo, { id: Number(id) });
      const tutorUpdated = await tutorServices.findOne({ id: Number(id) });
      return res.status(200).json(tutorUpdated);
    } catch (error) {
      if (error.message === 'passwordError') return res.status(400).json({ msg: 'senhas diferentes' });
      return res.status(500).json(error.message);
    }
  }

  // deletes a tutor ATTENTION: it will not delete the tutor if it is connected to an adoption
  static async deleteTutor(req, res) {
    const { id } = req.params;
    try {
      const tutorExists = await tutorServices.findOne({ id: Number(id) });
      if (tutorExists === null) throw new Error('UnexistentId'); // guarantees tutor exists before trying to delete it
      await tutorServices.destroy({ id: Number(id) });
      return res.status(200).json({ msg: `id ${id} deletado com sucesso` });
    } catch (error) {
      if (error.message === 'UnexistentId') return res.status(400).json({ msg: 'id não existente' });
      return res.status(500).json(error.message);
    }
  }
}

module.exports = TutorsController;
