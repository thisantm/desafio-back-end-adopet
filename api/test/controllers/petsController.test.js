const PetsController = require('../../controllers/PetsController');
const PetsServices = require('../../services/PetsServices');

describe('PetsController', () => {
  describe('findAllPets', () => {
    it('should return a json with all pets', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const pets = [
        {
          id: 1,
          shelter_id: 1,
          name: 'Dog',
          desciption: 'to be discovered',
          adopted: false,
          age: '2 anos',
          address: 'no address',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          shelter_id: 2,
          name: 'Cat',
          desciption: 'to be discovered',
          adopted: false,
          age: '2 anos',
          address: 'no address',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(PetsServices.prototype, 'findAll').mockResolvedValue(pets);

      await PetsController.findAllPets(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(pets);
    });
  });

  describe('findAllPets with no pets', () => {
    it('should return a json with a message', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(PetsServices.prototype, 'findAll').mockResolvedValue([]);

      await PetsController.findAllPets(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Não encontrado.' });
    });
  });

  describe('findAllPets with error', () => {
    it('should return a json with a message', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(PetsServices.prototype, 'findAll').mockRejectedValue(new Error('Error'));

      await PetsController.findAllPets(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Error');
    });
  });

  describe('findPetById', () => {
    it('should return a json with a pet', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const pet = {
        id: 1,
        shelter_id: 1,
        name: 'Dog',
        desciption: 'to be discovered',
        adopted: false,
        age: '2 anos',
        address: 'no address',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(PetsServices.prototype, 'findOne').mockResolvedValue(pet);

      await PetsController.findPetById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(pet);
    });
  });

  describe('findPetById with no pet', () => {
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

      jest.spyOn(PetsServices.prototype, 'findOne').mockResolvedValue(null);

      await PetsController.findPetById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Não encontrado.' });
    });
  });

  describe('findPetById with error', () => {
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

      jest.spyOn(PetsServices.prototype, 'findOne').mockRejectedValue(new Error('Error'));

      await PetsController.findPetById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Error');
    });
  });

  describe('createPet', () => {
    it('should return a json with a pet', async () => {
      const req = {
        params: {
          id: 1,
        },
        body: {
          name: 'Dog',
          desciption: 'to be discovered',
          adopted: false,
          age: '2 anos',
          address: 'no address',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const pet = {
        id: 1,
        shelter_id: req.params.id,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(PetsServices.prototype, 'create').mockResolvedValue(pet);

      await PetsController.createPet(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(pet);
    });
  });

  describe('createPet with error in url', () => {
    it('should return a json with a message', async () => {
      const req = {
        params: {
          id: 1,
        },
        body: {
          name: 'Dog',
          desciption: 'to be discovered',
          adopted: false,
          age: '2 anos',
          address: 'no address',
          image: 'https://google.com',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(PetsServices.prototype, 'create').mockResolvedValue(null);

      await PetsController.createPet(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'url não é uma imagem' });
    });
  });

  describe('createPet with error', () => {
    it('should return a json with a message', async () => {
      const req = {
        params: {
          id: 1,
        },
        body: {
          name: 'Dog',
          desciption: 'to be discovered',
          adopted: false,
          age: '2 anos',
          address: 'no address',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(PetsServices.prototype, 'create').mockRejectedValue(new Error('Error'));

      await PetsController.createPet(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Error');
    });
  });

  describe('updatePet', () => {
    it('should return a json with a pet', async () => {
      const req = {
        body: {
          id: 1,
          name: 'Dog',
          desciption: 'to be discovered',
          adopted: false,
          age: '2 anos',
          address: 'no address',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const pet = {
        ...req.body,
        updatedAt: new Date(),
      };

      jest.spyOn(PetsServices.prototype, 'findOneFullScope').mockResolvedValue(pet);
      jest.spyOn(PetsServices.prototype, 'update').mockResolvedValue(pet);

      await PetsController.updatePet(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(pet);
    });
  });

  describe('updatePet with error in url', () => {
    it('should return a json with a message', async () => {
      const req = {
        body: {
          id: 1,
          name: 'Dog',
          desciption: 'to be discovered',
          adopted: false,
          age: '2 anos',
          address: 'no address',
          image: 'https://google.com',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(PetsServices.prototype, 'update').mockResolvedValue(null);
      jest.spyOn(PetsServices.prototype, 'findOneFullScope').mockResolvedValue(null);

      await PetsController.updatePet(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'url não é uma imagem' });
    });
  });

  describe('updatePet with error', () => {
    it('should return a json with a message', async () => {
      const req = {
        body: {
          id: 1,
          name: 'Dog',
          desciption: 'to be discovered',
          adopted: false,
          age: '2 anos',
          address: 'no address',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const pet = {
        ...req.body,
        updatedAt: new Date(),
      };

      jest.spyOn(PetsServices.prototype, 'findOneFullScope').mockResolvedValue(pet);
      jest.spyOn(PetsServices.prototype, 'update').mockRejectedValue(new Error('Error'));

      await PetsController.updatePet(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Error');
    });
  });

  describe('deletePet', () => {
    it('should return a json with a message', async () => {
      const req = {
        params: {
          shelterId: 1,
          petId: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const pet = {
        id: 1,
        shelter_id: 1,
        name: 'Dog',
        desciption: 'to be discovered',
        adopted: false,
        age: '2 anos',
        address: 'no address',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
      };

      jest.spyOn(PetsServices.prototype, 'findOneFullScope').mockResolvedValue(pet);
      jest.spyOn(PetsServices.prototype, 'destroy').mockResolvedValue();

      await PetsController.deletePet(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ msg: `id ${req.params.petId} deletado com sucesso` });
    });
  });

  describe('deletePet with error when pet does not exist', () => {
    it('should return a json with a message', async () => {
      const req = {
        params: {
          shelterId: 1,
          petId: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(PetsServices.prototype, 'findOneFullScope').mockResolvedValue(null);
      jest.spyOn(PetsServices.prototype, 'destroy').mockResolvedValue();

      await PetsController.deletePet(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'id não existente' });
    });
  });

  describe('deletePet with error when it does not belong to the shelter', () => {
    it('should return a json with a message', async () => {
      const req = {
        params: {
          shelterId: 1,
          petId: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const pet = {
        id: 1,
        shelter_id: 2,
        name: 'Dog',
        desciption: 'to be discovered',
        adopted: false,
        age: '2 anos',
        address: 'no address',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
      };

      jest.spyOn(PetsServices.prototype, 'findOneFullScope').mockResolvedValue(pet);
      jest.spyOn(PetsServices.prototype, 'destroy').mockResolvedValue();

      await PetsController.deletePet(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'pet não pertence ao abrigo' });
    });
  });

  describe('deletePet with error', () => {
    it('should return a json with a message', async () => {
      const req = {
        params: {
          shelterId: 1,
          petId: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const pet = {
        id: 1,
        shelter_id: 1,
        name: 'Dog',
        desciption: 'to be discovered',
        adopted: false,
        age: '2 anos',
        address: 'no address',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
      };

      jest.spyOn(PetsServices.prototype, 'findOneFullScope').mockResolvedValue(pet);
      jest.spyOn(PetsServices.prototype, 'destroy').mockRejectedValue(new Error('Error'));

      await PetsController.deletePet(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Error');
    });
  });
});
