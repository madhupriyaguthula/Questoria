const Pet = require('../models/Pet');

// Adopt a new pet
const adoptPet = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, petType } = req.body;

    const pet = new Pet({ userId, name, petType });
    await pet.save();

    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all pets for a user
const getUserPets = async (req, res) => {
  try {
    const { userId } = req.params;
    const pets = await Pet.find({ userId });
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Feed or play with a pet (increases happiness/hunger, small chance to level up)
const interactWithPet = async (req, res) => {
  try {
    const { petId } = req.params;
    const { action } = req.body; // "feed" or "play"

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    if (action === 'feed') {
      pet.hunger = Math.min(100, pet.hunger + 20);
    } else if (action === 'play') {
      pet.happiness = Math.min(100, pet.happiness + 20);
    }

    // simple level up if both stats maxed
    if (pet.hunger === 100 && pet.happiness === 100) {
      pet.level += 1;
      pet.hunger = 80;
      pet.happiness = 80;
    }

    await pet.save();
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { adoptPet, getUserPets, interactWithPet };