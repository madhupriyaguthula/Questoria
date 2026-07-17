// src/data/avatarData.js
// ─────────────────────────────────────────────────────────
// Avatar options for Questoria's avatar selection screen.
// STATUS: Skeleton — will be filled in during Avatar Selection sprint.
// ─────────────────────────────────────────────────────────

const avatarData = [
  {
    id: 'avatar_01',
    name: 'The Scholar',
    class: 'Mage',
    description: 'A seeker of arcane knowledge. Excels in theory and magic.',
    stat: '+10% XP from quizzes',
    imageUrl: null, // will point to src/assets/avatars/scholar.png
  },
  {
    id: 'avatar_02',
    name: 'The Warrior',
    class: 'Knight',
    description: 'Brave and relentless. Charges into every challenge head-on.',
    stat: '+15% coin drops',
    imageUrl: null,
  },
  {
    id: 'avatar_03',
    name: 'The Ranger',
    class: 'Archer',
    description: 'Swift and precise. Completes challenges faster than any.',
    stat: '+20% speed bonus',
    imageUrl: null,
  },
  {
    id: 'avatar_04',
    name: 'The Healer',
    class: 'Cleric',
    description: 'Wise and patient. Never gives up, even in the hardest battles.',
    stat: 'Retry without XP loss',
    imageUrl: null,
  },
];

export default avatarData;