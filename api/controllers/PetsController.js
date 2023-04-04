const {PetsServices} = require('../services');
const petServices = new PetsServices();

class PetsController{
    static async findAllPets(req, res){
        try{
            const pets = await petServices.findAll();
            if(pets.length === 0) return res.status(200).json({msg : "Não encontrado."});
            return res.status(200).json(pets);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async findPetById(req,res){
        const {id} = req.params;
        try{
            const pet = await petServices.findOne({id: Number(id)});
            if(pet === null) return res.status(200).json({msg : "Não encontrado."});
            return res.status(200).json(pet);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async createPet(req, res){
        const {shelterId} = req.params;
        const petInfo = req.body;
        try{
            const petCreated = await petServices.create({shelter_id: Number(shelterId), ...petInfo});
            return res.status(200).json(petCreated);
        } catch(error){
            if(error.name == 'SequelizeUniqueConstraintError') return res.status(500).json({msg: "email já utilizado"});
            return res.status(500).json(error.message);
        }
    }

    static async updatePet(req,res){
        const newInfo = req.body;
        const id = req.body.id;
        delete req.body.adopted;
        try{
            await petServices.update(newInfo, {id: Number(id)});
            const petUpdated = await petServices.findOne({id: Number(id)});
            return res.status(200).json(petUpdated);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async deletePet(req,res){
        const {id} = req.params;
        try{
            const petExists = await petServices.findOne({id: Number(id)});
            if(petExists === null) return res.status(200).json({msg : "id não existente"});
            await petServices.destroy({id: Number(id)});
            return res.status(200).json({msg: `id ${id} deletado com sucesso`});
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PetsController; 