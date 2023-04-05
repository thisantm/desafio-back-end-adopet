const {AdoptionsServices} = require('../services');
const adoptionServices = new AdoptionsServices();

class AdoptionsController{

    static async createAdoption(req, res){
        const {shelterId, petId} = req.params;
        const adoptionInfo = req.body;
        try{
            const adoptionCreated = await adoptionServices.create({pet_id: Number(petId), ...adoptionInfo}, shelterId);
            return res.status(200).json(adoptionCreated);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async deleteAdoption(req,res){
        const {shelterId, id} = req.params;
        try{
            const adoptionExists = await adoptionServices.findOne({id: Number(id)});
            if(adoptionExists === null) return res.status(200).json({msg : "id não existente"});
            await adoptionServices.destroy(adoptionExists, shelterId);
            return res.status(200).json({msg: `id ${id} deletado com sucesso`});
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
}

module.exports = AdoptionsController; 