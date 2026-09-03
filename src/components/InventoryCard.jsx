// src/components/InventoryCard.jsx
// STATUS: Placeholder — will be built in the Inventory feature sprint.

function InventoryCard({ item }) {
  return (
    <div style={{ color: '#c9a84c', fontFamily: 'serif', border: '1px solid #c9a84c', padding: '0.5rem' }}>
      {item?.name ?? 'Empty slot'}
    </div>
  );
}

export default InventoryCard;