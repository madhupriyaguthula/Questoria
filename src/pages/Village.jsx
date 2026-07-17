import { useNavigate } from "react-router-dom";

export default function Village() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#111827", color: "#fef3c7", fontFamily: "Inter, sans-serif" }}>
      <div style={{ textAlign: "center", padding: "2rem", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", background: "rgba(17,24,39,0.9)" }}>
        <h1 style={{ marginBottom: "0.75rem", fontSize: "2rem" }}>Welcome to the Village</h1>
        <p style={{ marginBottom: "1.5rem", maxWidth: "420px", lineHeight: 1.6 }}>
          Your hero has been selected and the village is ready for your next adventure.
        </p>
        <button
          type="button"
          onClick={() => navigate("/avatar")}
          style={{ padding: "0.8rem 1.2rem", borderRadius: "999px", border: "none", cursor: "pointer", background: "#f59e0b", color: "#111827", fontWeight: 700 }}
        >
          Back to Avatar Selection
        </button>
      </div>
    </div>
  );
}
