const database = require("../models");

class TutoresController{
    static async pegaTodosTutores(req, res){
        try{
            const tutores = await database.Tutores.findAll();
            if(tutores.length === 0) return res.status(200).json({msg : "Não encontrado."});
            return res.status(200).json(tutores);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async pegaTutorPorId(req,res){
        const {id} = req.params;
        try{
            const tutor = await database.Tutores.findOne({where: {id: Number(id)}});
            if(tutor === null) return res.status(200).json({msg : "Não encontrado."});
            return res.status(200).json(tutor);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async criaTutor(req, res){
        const tutor = req.body;
        if(tutor.senha !== tutor.confirmaSenha) return res.status(200).json({msg : "senhas diferentes"});
        try{
            const tutorCriado = await database.Tutores.create(tutor);
            return res.status(200).json(tutorCriado);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async atualizaTutor(req,res){
        const novasInfos = req.body;
        const id = req.body.id;
        if(novasInfos.senha !== null && novasInfos.senha !== novasInfos.confirmaSenha) return res.status(200).json({msg : "senhas diferentes"});
        try{
            await database.Tutores.update(novasInfos, {where: {id: Number(id)}});
            const tutorAtualizado = await database.Tutores.findOne({where: {id: Number(id)}});
            return res.status(200).json(tutorAtualizado);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async deletaTutor(req,res){
        const {id} = req.params;
        try{
            const tutor = await database.Tutores.findOne({where: {id: Number(id)}});
            if(tutor === null) return res.status(200).json({msg : "id não existente"});
            await database.Tutores.destroy({where: {id: Number(id)}});
            return res.status(200).json({msg: `id ${id} deletado com sucesso`});
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
}

module.exports = TutoresController; 