const {TutorsServices} = require('../services');
const tutorServices = new TutorsServices();

class TutorsController{
    static async findAllTutors(req, res){ // finds all tutors, doesnt show password because of defaultScope
        try{
            const tutors = await tutorServices.findAll();
            if(tutors.length === 0) return res.status(200).json({msg : "Não encontrado."}); // if no shelter is found return a message "not found"
            return res.status(200).json(tutors);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async findTutorById(req,res){ // finds one tutor by id, doesnt show password because of defaultScope
        const {id} = req.params;
        try{
            const tutor = await tutorServices.findOne({id: Number(id)});
            if(tutor === null) return res.status(200).json({msg : "Não encontrado."}); // if the shelter is not found return a message "not found"
            return res.status(200).json(tutor);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async createTutor(req, res){ // creates a tutor
        const tutor = req.body;
        if(tutor.password !== tutor.confirmPassword) return res.status(200).json({msg : "senhas diferentes"}); // stops the creation of a new tutor if the password field does not equal the confirmPassword field
        try{
            const tutorCreated = await tutorServices.create(tutor);
            return res.status(200).json(tutorCreated);
        } catch(error){
            if(error.name == 'SequelizeUniqueConstraintError') return res.status(500).json({msg: "email já utilizado"}); // prints the error message informing that email has already been used
            return res.status(500).json(error.message);
        }
    }

    static async updateTutor(req,res){ // updates a tutor
        const newInfo = req.body;
        const id = req.body.id;
        if(newInfo.password !== null && newInfo.password !== newInfo.confirmPassword) return res.status(200).json({msg : "senhas diferentes"}); // check if password has been changed, if it is then check if it equals to the second field confirmPassword
        try{
            await tutorServices.update(newInfo, {id: Number(id)});
            const tutorUpdated = await tutorServices.findOne({id: Number(id)});
            return res.status(200).json(tutorUpdated);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async deleteTutor(req,res){ // deletes a tutor ATTENTION: it will not delete the tutor if it is connected to an adoption
        const {id} = req.params;
        try{
            const tutorExists = await tutorServices.findOne({id: Number(id)});
            if(tutorExists === null) return res.status(200).json({msg : "id não existente"}); // guarantees tutor exists before trying to delete it
            await tutorServices.destroy({id: Number(id)});
            return res.status(200).json({msg: `id ${id} deletado com sucesso`});
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
}

module.exports = TutorsController; 