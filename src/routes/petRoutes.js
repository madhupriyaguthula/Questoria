const express = require('express');
const router = express.Router();
const { adoptPet, getUserPets, interactWithPet } = require('../controllers/petController');

router.post('/:userId/adopt', adoptPet);
router.get('/:userId', getUserPets);
router.post('/:petId/interact', interactWithPet);

module.exports = router;