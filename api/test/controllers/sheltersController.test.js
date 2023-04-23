const SheltersController = require('../../controllers/SheltersController');
const SheltersServices = require('../../services/SheltersServices');

describe('SheltersController', () => {
  describe('findAllShelters', () => {
    it('should return a json with all shelters', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const shelters = [{
        id: 1,
        name: 'Shelter 1',
        email: 'shelter@shelter.com',
        password: '123',
      },
      {
        id: 2,
        name: 'Shelter 2',
        email: 'shelter@shelter.com',
        password: '1234',
      }];

      jest.spyOn(SheltersServices.prototype, 'findAll').mockResolvedValue(shelters);

      await SheltersController.findAllShelters(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(shelters);
    });
  });

  describe('findAllShelters with no shelters', () => {
    it('should return a json with a message', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(SheltersServices.prototype, 'findAll').mockResolvedValue([]);

      await SheltersController.findAllShelters(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Não encontrado.' });
    });
  });

  describe('findAllShelters with error', () => {
    it('should return a json with a message', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(SheltersServices.prototype, 'findAll').mockRejectedValue(new Error('Error'));

      await SheltersController.findAllShelters(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Error');
    });
  });

  describe('findShelterById', () => {
    it('should return a json with a shelter', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const shelter = {
        id: 1,
        name: 'Shelter 1',
        email: 'shelter@shelter.com',
        password: '123',
      };

      jest.spyOn(SheltersServices.prototype, 'findOne').mockResolvedValue(shelter);

      await SheltersController.findShelterById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(shelter);
    });
  });

  describe('findShelterById with no shelter', () => {
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

      jest.spyOn(SheltersServices.prototype, 'findOne').mockResolvedValue(null);

      await SheltersController.findShelterById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Não encontrado.' });
    });
  });

  describe('findShelterById with error', () => {
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

      jest.spyOn(SheltersServices.prototype, 'findOne').mockRejectedValue(new Error('Error'));

      await SheltersController.findShelterById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Error');
    });
  });

  describe('createShelter', () => {
    it('should return a json with a shelter', async () => {
      const req = {
        body: {
          name: 'Shelter 1',
          email: 'shelter@shelter.com',
          confirmPassword: '1234',
          password: '1234',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const shelter = {
        id: 1,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(SheltersServices.prototype, 'create').mockResolvedValue(shelter);

      await SheltersController.createShelter(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(shelter);
    });
  });

  describe('createShelter with error when password is not equal to confirmPassword', () => {
    it('should return a json with a message', async () => {
      const req = {
        body: {
          name: 'Shelter 1',
          email: 'shelter@shelter.com',
          confirmPassword: '1234',
          password: '123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await SheltersController.createShelter(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'senhas diferentes' });
    });
  });

  describe('createShelter with error when email already exists', () => {
    it('should return a json with a message', async () => {
      const req = {
        body: {
          name: 'Shelter 1',
          email: 'shelter@shelter.com',
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
      jest.spyOn(SheltersServices.prototype, 'create').mockRejectedValue(e);

      await SheltersController.createShelter(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'email já utilizado' });
    });
  });

  describe('createShelter with error', () => {
    it('should return a json with a message', async () => {
      const req = {
        body: {
          name: 'Shelter 1',
          email: 'shelter@shelter.com',
          confirmPassword: '1234',
          password: '1234',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(SheltersServices.prototype, 'create').mockRejectedValue(new Error('Error'));

      await SheltersController.createShelter(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Error');
    });
  });

  describe('updateShelter', () => {
    it('should return a json with a shelter', async () => {
      const req = {
        body: {
          id: 1,
          name: 'Shelter 1',
          email: 'shelter@shelter.com',
          confirmPassword: '1234',
          password: '1234',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const shelter = {
        id: 1,
        name: 'Shelter 1',
        email: 'shelter@shelter.com',
        confirmPassword: '1234',
        password: '1234',
      };

      jest.spyOn(SheltersServices.prototype, 'update').mockResolvedValue(shelter);
      jest.spyOn(SheltersServices.prototype, 'findOne').mockResolvedValue(shelter);

      await SheltersController.updateShelter(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(shelter);
    });
  });

  describe('updateShelter with error when password is not equal to confirmPassword', () => {
    it('should return a json with a message', async () => {
      const req = {
        body: {
          id: 1,
          name: 'Shelter 1',
          email: 'shelter@shelter.com',
          confirmPassword: '1234',
          password: '123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await SheltersController.updateShelter(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'senhas diferentes' });
    });
  });

  describe('updateShelter with error', () => {
    it('should return a json with a message', async () => {
      const req = {
        body: {
          id: 1,
          name: 'Shelter 1',
          email: 'shelter@shelter.com',
          confirmPassword: '1234',
          password: '1234',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(SheltersServices.prototype, 'update').mockRejectedValue(new Error('Error'));

      await SheltersController.updateShelter(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Error');
    });
  });

  describe('deleteShelter', () => {
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

      jest.spyOn(SheltersServices.prototype, 'destroy').mockResolvedValue();

      await SheltersController.deleteShelter(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ msg: `id ${req.params.id} deletado com sucesso` });
    });
  });

  describe('deleteShelter with error when shelter does not exist', () => {
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

      jest.spyOn(SheltersServices.prototype, 'destroy').mockResolvedValue(0);
      jest.spyOn(SheltersServices.prototype, 'findOne').mockResolvedValue(null);

      await SheltersController.deleteShelter(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'id não existente' });
    });
  });

  describe('deleteShelter with error', () => {
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

      const shelter = {
        id: 1,
        name: 'Shelter 1',
        email: 'shelter@shelter.com',
        confirmPassword: '1234',
        password: '1234',
      };

      jest.spyOn(SheltersServices.prototype, 'findOne').mockResolvedValue(shelter);
      jest.spyOn(SheltersServices.prototype, 'destroy').mockRejectedValue(new Error('Error'));

      await SheltersController.deleteShelter(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Error');
    });
  });
});
