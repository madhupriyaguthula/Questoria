// src/services/playerService.js
// ─────────────────────────────────────────────────────────
// QUESTORIA — Player Service
// Handles all API calls related to the player (XP, coins, inventory, etc.)
// STATUS: Skeleton — will connect to the real backend APIs later.
//
// Your teammate is building the backend endpoints.
// When she shares the API URLs, you'll replace the mock data below
// with real fetch() calls to those endpoints.
// ─────────────────────────────────────────────────────────

// Base URL — change this when the backend is ready
const API_BASE = 'http://localhost:5000/api'; // teammate's backend URL

// ── Mock player data (used until backend is ready) ──────
const mockPlayer = {
  id: 'player_001',
  name: 'Hero',
  avatarId: null,
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  coins: 0,
  title: 'Apprentice',
  inventory: [],
  unlockedArmor: ['armor_01'],
  equippedArmor: 'armor_01',
};

// ── Get current player data ──────────────────────────────
// Later: GET /api/player/:id
export async function getPlayer() {
  // TODO: replace with real fetch when backend is ready:
  // const res = await fetch(`${API_BASE}/player`);
  // return await res.json();

  return mockPlayer;
}

// ── Save player data ─────────────────────────────────────
// Later: PUT /api/player/:id
export async function savePlayer(playerData) {
  // TODO: replace with real fetch when backend is ready:
  // const res = await fetch(`${API_BASE}/player`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(playerData),
  // });
  // return await res.json();

  console.log('Saving player (mock):', playerData);
  return { success: true };
}

// ── Add XP to player ────────────────────────────────────
export function calculateLevel(xp) {
  // Each level requires 100 * level XP
  // Level 1: 0–100, Level 2: 100–300, Level 3: 300–600 …
  let level = 1;
  let xpRequired = 100;
  let totalRequired = 0;

  while (xp >= totalRequired + xpRequired) {
    totalRequired += xpRequired;
    level++;
    xpRequired = 100 * level;
  }

  return {
    level,
    currentXP: xp - totalRequired,
    xpToNextLevel: xpRequired,
    totalXP: xp,
  };
}

// ── Hero titles by level ─────────────────────────────────
export function getHeroTitle(level) {
  if (level >= 20) return 'Legendary Champion';
  if (level >= 15) return 'Grand Archmage';
  if (level >= 10) return 'Knight of Wisdom';
  if (level >= 7)  return 'Battle Scholar';
  if (level >= 5)  return 'Journeyman Hero';
  if (level >= 3)  return 'Brave Squire';
  return 'Apprentice';
}