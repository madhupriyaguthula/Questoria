// src/components/XPBar.jsx
// STATUS: Placeholder — will be built in the XP & Level feature sprint.

function XPBar({ current = 0, max = 100, level = 1 }) {
  return (
    <div style={{ color: '#c9a84c', fontFamily: 'serif' }}>
      XP Bar — Level {level} — {current}/{max} XP
    </div>
  );
}

export default XPBar;