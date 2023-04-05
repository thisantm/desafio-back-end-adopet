const {PetsServices} = require('../services');
const petServices = new PetsServices();
const { Image } = require('canvas') // necessary for image on node;

class PetsController{
    static async findAllPets(req, res){ // finds all pets, doesnt show adopted pets because of defaultScope
        try{
            const pets = await petServices.findAll();
            if(pets.length === 0) return res.status(200).json({msg : "Não encontrado."}); // if no pet is found return a message "not found"
            return res.status(200).json(pets);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async findPetById(req,res){ // finds a pet by id, doesnt show adopted pets because of defaultScope
        const {id} = req.params;
        try{
            const pet = await petServices.findOne({id: Number(id)});
            if(pet === null) return res.status(200).json({msg : "Não encontrado."}); // if the pet is not found return a message "not found"
            return res.status(200).json(pet);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async createPet(req, res){ // creates a pet, it has to be connected to a shelter
        const {shelterId} = req.params;
        const petInfo = req.body;

        const checkImage = new Image();  // https://www.zhenghao.io/posts/verify-image-url
        checkImage.src = petInfo.image;
        const validateImage = await new Promise((resolve) => { // validate the url is an image
            checkImage.onload = () => resolve(true);
            checkImage.onerror = () => resolve(false);
        });
        if(!validateImage) return res.status(200).json({msg: "url não é uma imagem"}); // if url is not an image send message "url is not an image"

        try{
            const petCreated = await petServices.create({shelter_id: Number(shelterId), ...petInfo});
            return res.status(200).json(petCreated);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async updatePet(req,res){ // updates a pet info it doesn't allow to change the adopted field
        const newInfo = req.body;
        const id = req.body.id;
        delete req.body.adopted;

        const checkImage = new Image(); // https://www.zhenghao.io/posts/verify-image-url
        checkImage.src = newInfo.image;
        const validateImage = await new Promise((resolve) => { // validate the url is an image
            checkImage.onload = () => resolve(true);
            checkImage.onerror = () => resolve(false);
        });
        if(!validateImage) return res.status(200).json({msg: "url não é uma imagem"}); // if url is not an image send message "url is not an image"

        try{
            await petServices.update(newInfo, {id: Number(id)});
            const petUpdated = await petServices.findOneFullScope({id: Number(id)});
            return res.status(200).json(petUpdated);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async deletePet(req,res){ // deletes a pet ATTENTION: it will not delete the pet if it has an adoption
        const {shelterId, petId} = req.params;
        try{
            const petExists = await petServices.findOneFullScope({id: Number(petId)});
            if(petExists === null) return res.status(200).json({msg : "id não existente"}); // guarantees pet exists before trying to delete it
            if(petExists.shelter_id !== Number(shelterId)) return res.status(200).json({msg : "id não existente"}); // guarantees pet is from the shelter before deleting it
            await petServices.destroy(petExists.id);
            return res.status(200).json({msg: `id ${petId} deletado com sucesso`});
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PetsController; 