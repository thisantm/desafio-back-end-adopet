const { Router } = require('express');
const TutorsController = require('../controllers/TutorsController');

const router = Router();

router.get('/tutores', TutorsController.findAllTutors);
router.get('/tutores/:id', TutorsController.findTutorById);

router.post('/tutores', TutorsController.createTutor);

router.put('/tutores', TutorsController.updateTutor);
router.patch('/tutores', TutorsController.updateTutor);

router.delete('/tutores/:id', TutorsController.deleteTutor);

module.exports = router;
