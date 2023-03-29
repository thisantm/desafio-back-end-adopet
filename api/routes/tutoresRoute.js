const { Router } = require('express');
const TutoresController = require('../controllers/TutoresController.js');

const router = Router();

router.get("/tutores", TutoresController.pegaTodosTutores);
router.get("/tutores/:id", TutoresController.pegaTutorPorId);

router.post("/tutores", TutoresController.criaTutor);

router.put("/tutores", TutoresController.atualizaTutor);
router.patch("/tutores", TutoresController.atualizaTutor);

router.delete("/tutores/:id", TutoresController.deletaTutor);

module.exports = router;