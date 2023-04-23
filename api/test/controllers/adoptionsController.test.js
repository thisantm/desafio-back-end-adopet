const AdoptionsController = require('../../controllers/AdoptionsController');
const AdoptionsServices = require('../../services/AdoptionsServices');

describe('AdoptionsController', () => {
  describe('createAdoption', () => {
    it('should return a json with a adoption', async () => {
      const req = {
        params: {
          shelterId: 1,
          petId: 1,
        },
        body: {
          tutor_id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const adoption = {
        id: 1,
        pet_id: req.params.petId,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(AdoptionsServices.prototype, 'create').mockResolvedValue(adoption);

      await AdoptionsController.createAdoption(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(adoption);
    });
  });

  describe('createAdoption with error when pet doesnt exist', () => {
    it('should return a json with a message', async () => {
      const req = {
        params: {
          shelterId: 1,
          petId: 1,
        },
        body: {
          tutor_id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const e = new Error('petDoesNotExist');
      jest.spyOn(AdoptionsServices.prototype, 'create').mockRejectedValue(e);

      await AdoptionsController.createAdoption(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'esse pet não existe' });
    });
  });

  describe('createAdoption with error when pet does not belong to shelter', () => {
    it('should return a json with a message', async () => {
      const req = {
        params: {
          shelterId: 1,
          petId: 1,
        },
        body: {
          tutor_id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const e = new Error('petDoesntBelongToShelter');
      jest.spyOn(AdoptionsServices.prototype, 'create').mockRejectedValue(e);

      await AdoptionsController.createAdoption(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'esse pet não pertence a esse abrigo' });
    });
  });

  describe('createAdoption with error when pet is already adopted', () => {
    it('should return a json with a message', async () => {
      const req = {
        params: {
          shelterId: 1,
          petId: 1,
        },
        body: {
          tutor_id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const e = new Error('petContainsAdoption');
      jest.spyOn(AdoptionsServices.prototype, 'create').mockRejectedValue(e);

      await AdoptionsController.createAdoption(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'esse pet já foi adotado' });
    });
  });

  describe('createAdoption with error', () => {
    it('should return a json with a message', async () => {
      const req = {
        params: {
          shelterId: 1,
          petId: 1,
        },
        body: {
          tutor_id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(AdoptionsServices.prototype, 'create').mockRejectedValue(new Error('Error'));

      await AdoptionsController.createAdoption(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Error');
    });
  });

  describe('deleteAdoption', () => {
    it('should return a json with a message', async () => {
      const req = {
        params: {
          shelterId: 1,
          id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const adoption = {
        id: 1,
        tutor_id: 1,
        pet_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(AdoptionsServices.prototype, 'findOne').mockResolvedValue(adoption);
      jest.spyOn(AdoptionsServices.prototype, 'destroy').mockResolvedValue();

      await AdoptionsController.deleteAdoption(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ msg: `id ${req.params.id} deletado com sucesso` });
    });
  });

  describe('deleteAdoption with error when adoption does not exist', () => {
    it('should return a json with a message', async () => {
      const req = {
        params: {
          shelterId: 1,
          id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(AdoptionsServices.prototype, 'findOne').mockResolvedValue(null);
      jest.spyOn(AdoptionsServices.prototype, 'destroy').mockResolvedValue(null);

      await AdoptionsController.deleteAdoption(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'id não existente' });
    });
  });

  describe('deleteAdoption with error when pet does not belong to shelter', () => {
    it('should return a json with a message', async () => {
      const req = {
        params: {
          shelterId: 1,
          id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const adoption = {
        id: 1,
        tutor_id: 1,
        pet_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(AdoptionsServices.prototype, 'findOne').mockResolvedValue(adoption);

      const e = new Error('petDoesntBelongToShelter');
      jest.spyOn(AdoptionsServices.prototype, 'destroy').mockRejectedValue(e);

      await AdoptionsController.deleteAdoption(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'esse pet não pertence a esse abrigo' });
    });
  });

  describe('deleteAdoption with error', () => {
    it('should return a json with a message', async () => {
      const req = {
        params: {
          shelterId: 1,
          id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const adoption = {
        id: 1,
        tutor_id: 1,
        pet_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(AdoptionsServices.prototype, 'findOne').mockResolvedValue(adoption);
      jest.spyOn(AdoptionsServices.prototype, 'destroy').mockRejectedValue(new Error('Error'));

      await AdoptionsController.deleteAdoption(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Error');
    });
  });
});
