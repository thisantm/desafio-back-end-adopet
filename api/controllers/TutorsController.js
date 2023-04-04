const database = require("../models");

class TutorsController{
    static async findAllTutors(req, res){
        try{
            const tutors = await database.Tutor.findAll();
            if(tutors.length === 0) return res.status(200).json({msg : "Não encontrado."});
            return res.status(200).json(tutors);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async findTutorById(req,res){
        const {id} = req.params;
        try{
            const tutor = await database.Tutor.findOne({where: {id: Number(id)}});
            if(tutor === null) return res.status(200).json({msg : "Não encontrado."});
            return res.status(200).json(tutor);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async createTutor(req, res){
        const tutor = req.body;
        if(tutor.password !== tutor.confirmPassword) return res.status(200).json({msg : "senhas diferentes"});
        try{
            const tutorCriado = await database.Tutor.create(tutor);
            return res.status(200).json(tutorCriado);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async updateTutor(req,res){
        const newInfo = req.body;
        const id = req.body.id;
        if(newInfo.password !== null && newInfo.password !== newInfo.confirmPassword) return res.status(200).json({msg : "senhas diferentes"});
        try{
            await database.Tutor.update(newInfo, {where: {id: Number(id)}});
            const tutorAtualizado = await database.Tutor.findOne({where: {id: Number(id)}});
            return res.status(200).json(tutorAtualizado);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async deleteTutor(req,res){
        const {id} = req.params;
        try{
            const tutorExists = await database.Tutor.findOne({where: {id: Number(id)}});
            if(tutorExists === null) return res.status(200).json({msg : "id não existente"});
            await database.Tutor.destroy({where: {id: Number(id)}});
            return res.status(200).json({msg: `id ${id} deletado com sucesso`});
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
}

module.exports = TutorsController; 