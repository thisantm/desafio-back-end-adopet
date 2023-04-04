const { Router } = require('express');
const SheltersController = require('../controllers/SheltersController.js');
const PetsController = require('../controllers/PetsController.js');

const router = Router();

router.get("/abrigos", SheltersController.findAllShelters);
router.get("/abrigos/:id", SheltersController.findShelterById);

router.post("/abrigos", SheltersController.createShelter);

router.put("/abrigos", SheltersController.updateShelter);
router.patch("/abrigos", SheltersController.updateShelter);

router.delete("/abrigos/:id", SheltersController.deleteShelter);

//pet
router.get("/pets", PetsController.findAllPets);
router.get("/pets/:id", PetsController.findPetById);

router.post("/abrigos/:shelterId/pets", PetsController.createPet);

router.put("/abrigos/:shelterId/pets/", PetsController.updatePet);
router.patch("/abrigos/:shelterId/pets/", PetsController.updatePet);

router.delete("/abrigos/:shelterId/pets/:petId", PetsController.deletePet);

module.exports = router;