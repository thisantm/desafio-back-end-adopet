const {SheltersServices} = require('../services');
const shelterServices = new SheltersServices();

class SheltersController{
    static async findAllShelters(req, res){ // finds all shelters, doesnt show password because of defaultScope
        try{
            const shelters = await shelterServices.findAll();
            if(shelters.length === 0) return res.status(200).json({msg : "Não encontrado."}); // if no shelter is found return a message "not found"
            return res.status(200).json(shelters);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async findShelterById(req,res){ // finds one shelter by id, doesnt show password because of defaultScope
        const {id} = req.params;
        try{
            const shelter = await shelterServices.findOne({id: Number(id)});
            if(shelter === null) return res.status(200).json({msg : "Não encontrado."}); // if shelter is not found return a message "not found"
            return res.status(200).json(shelter);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async createShelter(req, res){ // creates a shelter
        const shelter = req.body;
        if(shelter.password !== shelter.confirmPassword) return res.status(200).json({msg : "senhas diferentes"}); // stops the creation of a new shelter if the password field does not equal the confirmPassword field
        try{
            const shelterCreated = await shelterServices.create(shelter);
            return res.status(200).json(shelterCreated);
        } catch(error){
            if(error.name == 'SequelizeUniqueConstraintError') return res.status(500).json({msg: "email já utilizado"});
            return res.status(500).json(error.message);
        }
    }

    static async updateShelter(req,res){ // updates a shelter
        const newInfo = req.body;
        const id = req.body.id;
        if(newInfo.password !== null && newInfo.password !== newInfo.confirmPassword) return res.status(200).json({msg : "senhas diferentes"}); // check if password has been changed, if it is then check if it equals to the second field confirmPassword
        try{
            await shelterServices.update(newInfo, {id: Number(id)});
            const shelterUpdated = await shelterServices.findOne({id: Number(id)});
            return res.status(200).json(shelterUpdated);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async deleteShelter(req,res){ // deletes a shelter ATTENTION: it will not delete the shelter if it has pets
        const {id} = req.params;
        try{
            const shelterExists = await shelterServices.findOne({id: Number(id)});
            if(shelterExists === null) return res.status(200).json({msg : "id não existente"}); // guarantees shelter exists before trying to delete it
            await shelterServices.destroy({id: Number(id)});
            return res.status(200).json({msg: `id ${id} deletado com sucesso`});
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
}

module.exports = SheltersController; 