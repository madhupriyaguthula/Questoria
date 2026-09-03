import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogueBox from "../components/DialogueBox";
import villageBg from "../assets/village-bg.png";

const villageDialogue = [
  { speaker: "Saint", text: "Welcome, young one. Every hero begins their journey here." },
  { speaker: "Saint", text: "You will travel through 7 worlds, learning and growing stronger." },
  { speaker: "Saint", text: "Each quiz you pass earns you XP and Coins. Learn well, and bonuses await." },
  { speaker: "Saint", text: "Collect 2000 XP, and you shall earn the title of Hero." },
  { speaker: "Saint", text: "Coins can also be exchanged — 10 XP for every 1 coin, should you need them." },
  { speaker: "Saint", text: "Complete a course, and a companion pet shall choose to walk beside you." },
  { speaker: "Saint", text: "Defeat the guardian of World 7, and a certificate of mastery is yours." },
  { speaker: "Saint", text: "Now, choose the path that calls to you." },
];

const gameRules = [
  { icon: "📜", text: "Complete Quests & Quizzes to earn XP and Coins." },
  { icon: "⚡", text: "Gain XP to level up and unlock new worlds." },
  { icon: "🪙", text: "Use Coins to unlock items, pets and customizations." },
  { icon: "🐉", text: "Defeat Bosses by answering questions and proving your knowledge." },
  { icon: "🗺️", text: "Explore all 7 Worlds and become the ultimate champion!" },
];

function VillagePage() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout and reset your current path?")) {
      localStorage.removeItem("selectedPath");
      localStorage.removeItem("hasSelectedPath");
      window.location.href = "/";
    }
  };

  return (
    <div className="village-fullpage" style={{ backgroundImage: `url(${villageBg})` }}>
      {/* Settings Dropdown Container */}
      <div className="village-settings-wrapper">
        <button 
          className="village-settings-btn"
          onClick={() => setShowDropdown(!showDropdown)}
          title="Settings Menu"
        >
          ⚙️
        </button>
        {showDropdown && (
          <div className="village-settings-dropdown">
            <button className="dropdown-item-btn" onClick={() => navigate("/profile")}>
              👤 View Profile
            </button>
            <button className="dropdown-item-btn logout" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        )}
      </div>

      <h1 className="questoria-title">Questoria</h1>
      <p className="village-subtitle">WELCOME TO THE VILLAGE</p>
      <p className="village-subtitle">Your Journey Begins Now</p>

      <div className="rules-box">
        <h2 className="rules-title">Game Rules</h2>
        <div className="rules-list">
          {gameRules.map((rule, i) => (
            <div key={i} className="rule-item">
              <span className="rule-icon">{rule.icon}</span>
              <p>{rule.text}</p>
            </div>
          ))}
        </div>
        <p className="rules-footer">Learn &middot; Play &middot; Grow &middot; Conquer</p>
      </div>

      <DialogueBox
        dialogue={villageDialogue}
        onComplete={() => navigate("/path-select")}
        buttonLabel="Choose Path"
      />
    </div>
  );
}

export default VillagePage;