import { useNavigate } from "react-router-dom";
import { learningPaths } from "../data/pathsData";
import pathSelectBg from "../assets/pathselect-bg.png";
import QuickNav from "../components/QuickNav";

const pathIcons = {
  fullstack: "🧩",
  frontend: "💻",
  backend: "⚙️",
  ai: "🤖",
  aiml: "🧠",
  sql: "🗄️",
  cs: "📚",
  python: "🐍",
  java: "☕",
  dsa: "🔗",
};

function PathSelectPage({ onSelectPath }) {
  const navigate = useNavigate();

  const handleSelect = (pathId) => {
    onSelectPath(pathId);
    navigate("/worldmap");
  };

  return (
    <div className="path-select-fullpage" style={{ backgroundImage: `url(${pathSelectBg})` }}>
    <QuickNav />
      <div className="path-select-overlay">
        <h1>Choose Your Path</h1>
        <div className="path-grid">
          {learningPaths.map((path) => (
            <div key={path.id} className="path-card" onClick={() => handleSelect(path.id)}>
              <span className="path-icon">{pathIcons[path.id]}</span>
              <h3>{path.name}</h3>
              <p>{path.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PathSelectPage;