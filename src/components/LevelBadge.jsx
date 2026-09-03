// src/components/LevelBadge.jsx
// STATUS: Placeholder — will be built in the XP & Level feature sprint.

function LevelBadge({ level = 1 }) {
  return (
    <div style={{ color: '#c9a84c', fontFamily: 'serif' }}>
      ⭐ Level {level}
    </div>
  );
}

export default LevelBadge;