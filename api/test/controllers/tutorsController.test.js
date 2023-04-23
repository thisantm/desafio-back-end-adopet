const TutorsController = require('../../controllers/TutorsController');
const TutorsServices = require('../../services/TutorsServices');

describe('TutorsController', () => {
  describe('findAllTutors', () => {
    it('should return a json with all tutors', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const tutors = [{
        id: 1,
        name: 'Tutor 1',
        email: 'tutor@tutor.com',
        password: '123',
      },
      {
        id: 2,
        name: 'Tutor 2',
        email: 'tutor@tutor.com',
        password: '1234',
      }];

      jest.spyOn(TutorsServices.prototype, 'findAll').mockResolvedValue(tutors);

      await TutorsController.findAllTutors(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(tutors);
    });
  });

  describe('findAllTutors with no tutors', () => {
    it('should return a json with a message', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(TutorsServices.prototype, 'findAll').mockResolvedValue([]);

      await TutorsController.findAllTutors(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Não encontrado.' });
    });
  });

  describe('findAllTutors with error', () => {
    it('should return a json with a message', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(TutorsServices.prototype, 'findAll').mockRejectedValue(new Error('Error'));

      await TutorsController.findAllTutors(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Error');
    });
  });

  describe('findTutorById', () => {
    it('should return a json with a tutor', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const tutor = {
        id: 1,
        name: 'Tutor 1',
        email: 'tutor@tutor.com',
        password: '123',
      };

      jest.spyOn(TutorsServices.prototype, 'findOne').mockResolvedValue(tutor);

      await TutorsController.findTutorById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(tutor);
    });
  });

  describe('findTutorById with no tutor', () => {
    it('should return a json with a message', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(TutorsServices.prototype, 'findOne').mockResolvedValue(null);

      await TutorsController.findTutorById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Não encontrado.' });
    });
  });

  describe('findTutorById with error', () => {
    it('should return a json with a message', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(TutorsServices.prototype, 'findOne').mockRejectedValue(new Error('Error'));

      await TutorsController.findTutorById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Error');
    });
  });

  describe('createTutor', () => {
    it('should return a json with a tutor', async () => {
      const req = {
        body: {
          name: 'Tutor 1',
          email: 'tutor@tutor.com',
          confirmPassword: '1234',
          password: '1234',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const tutor = {
        id: 1,
        name: 'Tutor 1',
        email: 'tutor@tutor.com',
        confirmPassword: '1234',
        password: '1234',
      };

      jest.spyOn(TutorsServices.prototype, 'create').mockResolvedValue(tutor);

      await TutorsController.createTutor(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(tutor);
    });
  });

  describe('createTutor with error when password is not equal to confirmPassword', () => {
    it('should return a json with a message', async () => {
      const req = {
        body: {
          name: 'Tutor 1',
          email: 'tutor@tutor.com',
          confirmPassword: '1234',
          password: '123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await TutorsController.createTutor(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'senhas diferentes' });
    });
  });

  describe('createTutor with error when email already exists', () => {
    it('should return a json with a message', async () => {
      const req = {
        body: {
          name: 'Tutor 1',
          email: 'tutor@tutor.com',
          confirmPassword: '1234',
          password: '1234',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const e = new Error();
      e.name = 'SequelizeUniqueConstraintError';
      jest.spyOn(TutorsServices.prototype, 'create').mockRejectedValue(e);

      await TutorsController.createTutor(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'email já utilizado' });
    });
  });

  describe('createTutor with error', () => {
    it('should return a json with a message', async () => {
      const req = {
        body: {
          name: 'Tutor 1',
          email: 'tutor@tutor.com',
          confirmPassword: '1234',
          password: '1234',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(TutorsServices.prototype, 'create').mockRejectedValue(new Error('Error'));

      await TutorsController.createTutor(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Error');
    });
  });

  describe('updateTutor', () => {
    it('should return a json with a tutor', async () => {
      const req = {
        body: {
          id: 1,
          name: 'Tutor 1',
          email: 'tutor@tutor.com',
          confirmPassword: '1234',
          password: '1234',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const tutor = {
        id: 1,
        name: 'Tutor 1',
        email: 'tutor@tutor.com',
        confirmPassword: '1234',
        password: '1234',
      };

      jest.spyOn(TutorsServices.prototype, 'update').mockResolvedValue(tutor);
      jest.spyOn(TutorsServices.prototype, 'findOne').mockResolvedValue(tutor);

      await TutorsController.updateTutor(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(tutor);
    });
  });

  describe('updateTutor with error when password is not equal to confirmPassword', () => {
    it('should return a json with a message', async () => {
      const req = {
        body: {
          id: 1,
          name: 'Tutor 1',
          email: 'tutor@tutor.com',
          confirmPassword: '1234',
          password: '123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await TutorsController.updateTutor(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'senhas diferentes' });
    });
  });

  describe('updateTutor with error', () => {
    it('should return a json with a message', async () => {
      const req = {
        body: {
          id: 1,
          name: 'Tutor 1',
          email: 'tutor@tutor.com',
          confirmPassword: '1234',
          password: '1234',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(TutorsServices.prototype, 'update').mockRejectedValue(new Error('Error'));

      await TutorsController.updateTutor(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Error');
    });
  });

  describe('deleteTutor', () => {
    it('should return a json with a message', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(TutorsServices.prototype, 'destroy').mockResolvedValue();

      await TutorsController.deleteTutor(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ msg: `id ${req.params.id} deletado com sucesso` });
    });
  });

  describe('deleteTutor with error when tutor does not exist', () => {
    it('should return a json with a message', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(TutorsServices.prototype, 'destroy').mockResolvedValue(0);
      jest.spyOn(TutorsServices.prototype, 'findOne').mockResolvedValue(null);

      await TutorsController.deleteTutor(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'id não existente' });
    });
  });

  describe('deleteTutor with error', () => {
    it('should return a json with a message', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const tutor = {
        id: 1,
        name: 'Tutor 1',
        email: 'tutor@tutor.com',
        confirmPassword: '1234',
        password: '1234',
      };

      jest.spyOn(TutorsServices.prototype, 'findOne').mockResolvedValue(tutor);
      jest.spyOn(TutorsServices.prototype, 'destroy').mockRejectedValue(new Error('Error'));

      await TutorsController.deleteTutor(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Error');
    });
  });
});
