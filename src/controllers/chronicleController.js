const User = require('../models/User');
const World = require('../models/World');
const BossBattle = require('../models/BossBattle');
const Pet = require('../models/Pet');
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const getChronicle = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const world = await World.findOne({ userId });
    const battles = await BossBattle.find({ userId });
    const pets = await Pet.find({ userId });

    const battlesWon = battles.filter(b => b.status === 'won').length;
    const level = world ? world.currentLevel : 1;
    const xp = world ? world.xp : 0;
    const petNames = pets.map(p => p.name).join(', ') || 'no companions yet';

    const prompt = `Write a short, engaging fantasy RPG chronicle (3-4 sentences) narrating this hero's journey.
Hero name: ${user.username}
Level: ${level}
XP: ${xp}
Boss battles won: ${battlesWon}
Companions/pets: ${petNames}
Make it sound like an epic story journal entry, second or third person, immersive fantasy tone. Return ONLY the story text, no titles, no extra formatting.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.8
    });

    const chronicleText = completion.choices[0].message.content.trim();

    res.status(200).json({
      username: user.username,
      level,
      xp,
      battlesWon,
      pets: petNames,
      chronicle: chronicleText
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getChronicle };