const { Router } = require('express');
const SheltersController = require('../controllers/SheltersController.js');

const router = Router();

router.get("/abrigos", SheltersController.findAllShelters);
router.get("/abrigos/:id", SheltersController.findShelterById);

router.post("/abrigos", SheltersController.createShelter);

router.put("/abrigos", SheltersController.updateShelter);
router.patch("/abrigos", SheltersController.updateShelter);

router.delete("/abrigos/:id", SheltersController.deleteShelter);

module.exports = router;