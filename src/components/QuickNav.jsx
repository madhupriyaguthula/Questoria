import { useNavigate } from "react-router-dom";

function QuickNav() {
  const navigate = useNavigate();

  return (
    <div className="quick-nav">
      <button onClick={() => navigate("/village")} className="quick-nav-btn">
        🏠 Village
      </button>
      <button onClick={() => navigate("/path-select")} className="quick-nav-btn">
        🗺️ Choose Path
      </button>
    </div>
  );
}

export default QuickNav;