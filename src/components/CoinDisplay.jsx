// src/components/CoinDisplay.jsx
// STATUS: Placeholder — will be built in the Coins feature sprint.

function CoinDisplay({ amount = 0 }) {
  return (
    <div style={{ color: '#c9a84c', fontFamily: 'serif' }}>
      🪙 {amount} coins
    </div>
  );
}

export default CoinDisplay;