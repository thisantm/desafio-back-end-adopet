const {SheltersServices} = require('../services');
const shelterServices = new SheltersServices();

class SheltersController{
    static async findAllShelters(req, res){
        try{
            const shelters = await shelterServices.findAll();
            if(shelters.length === 0) return res.status(200).json({msg : "Não encontrado."});
            return res.status(200).json(shelters);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async findShelterById(req,res){
        const {id} = req.params;
        try{
            const shelter = await shelterServices.findOne({id: Number(id)});
            if(shelter === null) return res.status(200).json({msg : "Não encontrado."});
            return res.status(200).json(shelter);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async createShelter(req, res){
        const shelter = req.body;
        if(shelter.password !== shelter.confirmPassword) return res.status(200).json({msg : "senhas diferentes"});
        try{
            const shelterCreated = await shelterServices.create(shelter);
            return res.status(200).json(shelterCreated);
        } catch(error){
            if(error.name == 'SequelizeUniqueConstraintError') return res.status(500).json({msg: "email já utilizado"});
            return res.status(500).json(error.message);
        }
    }

    static async updateShelter(req,res){
        const newInfo = req.body;
        const id = req.body.id;
        if(newInfo.password !== null && newInfo.password !== newInfo.confirmPassword) return res.status(200).json({msg : "senhas diferentes"});
        try{
            await shelterServices.update(newInfo, {id: Number(id)});
            const shelterUpdated = await shelterServices.findOne({id: Number(id)});
            return res.status(200).json(shelterUpdated);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async deleteShelter(req,res){
        const {id} = req.params;
        try{
            const shelterExists = await shelterServices.findOne({id: Number(id)});
            if(shelterExists === null) return res.status(200).json({msg : "id não existente"});
            await shelterServices.destroy({id: Number(id)});
            return res.status(200).json({msg: `id ${id} deletado com sucesso`});
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
}

module.exports = SheltersController; 