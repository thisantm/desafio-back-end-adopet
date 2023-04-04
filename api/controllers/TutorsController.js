const {TutorsServices} = require('../services');
const tutorServices = new TutorsServices();

class TutorsController{
    static async findAllTutors(req, res){
        try{
            const tutors = await tutorServices.findAll();
            if(tutors.length === 0) return res.status(200).json({msg : "Não encontrado."});
            return res.status(200).json(tutors);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async findTutorById(req,res){
        const {id} = req.params;
        try{
            const tutor = await tutorServices.findOne({id: Number(id)});
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
            const tutorCreated = await tutorServices.create(tutor);
            return res.status(200).json(tutorCreated);
        } catch(error){
            if(error.name == 'SequelizeUniqueConstraintError') return res.status(500).json({msg: "email já utilizado"});
            return res.status(500).json(error.message);
        }
    }

    static async updateTutor(req,res){
        const newInfo = req.body;
        const id = req.body.id;
        if(newInfo.password !== null && newInfo.password !== newInfo.confirmPassword) return res.status(200).json({msg : "senhas diferentes"});
        try{
            await tutorServices.update(newInfo, {id: Number(id)});
            const tutorUpdated = await tutorServices.findOne({id: Number(id)});
            return res.status(200).json(tutorUpdated);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async deleteTutor(req,res){
        const {id} = req.params;
        try{
            const tutorExists = await tutorServices.findOne({id: Number(id)});
            if(tutorExists === null) return res.status(200).json({msg : "id não existente"});
            await tutorServices.destroy({id: Number(id)});
            return res.status(200).json({msg: `id ${id} deletado com sucesso`});
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
}

module.exports = TutorsController; 