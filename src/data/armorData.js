// src/data/armorData.js
// ─────────────────────────────────────────────────────────
// Armor unlock data for Questoria.
// STATUS: Skeleton — will be filled in during the Armor Unlock sprint.
// ─────────────────────────────────────────────────────────

const armorData = [
  {
    id: 'armor_01',
    name: 'Apprentice Robe',
    description: 'The starting armor. Humble but full of potential.',
    requiredLevel: 1,
    requiredXP: 0,
    rarity: 'common',
    imageUrl: null, // will point to src/assets/armor/apprentice.png
  },
  {
    id: 'armor_02',
    name: 'Scholar\'s Mantle',
    description: 'Earned by those who seek knowledge without hesitation.',
    requiredLevel: 5,
    requiredXP: 500,
    rarity: 'uncommon',
    imageUrl: null,
  },
  {
    id: 'armor_03',
    name: 'Knight of Wisdom',
    description: 'Forged for heroes who have conquered three worlds.',
    requiredLevel: 10,
    requiredXP: 1500,
    rarity: 'rare',
    imageUrl: null,
  },
  {
    id: 'armor_04',
    name: 'Arcane Sovereign',
    description: 'Only the greatest champions wear this legendary armor.',
    requiredLevel: 20,
    requiredXP: 5000,
    rarity: 'legendary',
    imageUrl: null,
  },
];

export default armorData;