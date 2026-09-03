import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { worlds } from "../data/questData";
import avatarHero from "../assets/avatar-hero.png";
import heroPortrait from "../assets/hero.png";
import saintPortrait from "../assets/saint-portrait.png";
import questDetailsBg from "../assets/quest-details-bg.png";
import CertificateModal from "../components/CertificateModal";
import "./ProfilePage.css";

// Profile portraits library mapping
const PORTRAITS = {
  "avatar-hero.png": avatarHero,
  "hero.png": heroPortrait,
  "saint-portrait.png": saintPortrait
};

// Custom labels for the worlds
const WORLD_REWARDS_MAP = [
  { id: 1, name: "World 1: HTML Mastery", badge: "📜 HTML Initiate", item: "🥾 Wooden Boots", type: "Feet Gear" },
  { id: 2, name: "World 2: CSS Fundamentals", badge: "🎨 CSS Painter", item: "🧤 Style Gloves", type: "Hand Gear" },
  { id: 3, name: "World 3: JavaScript Basics", badge: "⚡ JS Apprentice", item: "📿 Logic Amulet", type: "Accessory" },
  { id: 4, name: "World 4: Logic & Loops", badge: "🧩 Puzzle Solver", item: "💍 Focus Ring", type: "Accessory" },
  { id: 5, name: "World 5: Data Structures", badge: "🗝️ Vault Raider", item: "🎓 Scholar's Hat", type: "Head Gear" },
  { id: 6, name: "World 6: Mini-Project", badge: "⚒️ Project Builder", item: "🧥 Apprentice Cloak", type: "Body Gear" },
  { id: 7, name: "World 7: Final Boss", badge: "🏆 Boss Conqueror", item: "🛡️ Legendary Armor", type: "Chest Gear" }
];

function ProfilePage({ 
  username, 
  setUsername, 
  avatar, 
  setAvatar, 
  totalXP, 
  totalCoins, 
  heroTitle, 
  inventory = [], 
  completedWorlds = [], 
  selectedPath,
  hasCertificate
}) {
  const navigate = useNavigate();
  const [tempName, setTempName] = useState(username);
  const [isEditing, setIsEditing] = useState(false);
  const [showCert, setShowCert] = useState(false);

  // Dynamic portrait resolver that supports standard templates & custom paths from the avatar page
  const getAvatarImage = (filename) => {
    if (PORTRAITS[filename]) return PORTRAITS[filename];
    if (filename && (filename.startsWith("data:") || filename.startsWith("/") || filename.startsWith("http"))) {
      return filename;
    }
    return avatarHero;
  };

  const handleSaveName = (e) => {
    e.preventDefault();
    if (tempName.trim()) {
      setUsername(tempName.trim());
      setIsEditing(false);
    }
  };

  // Progress metrics calculation
  const completedCount = completedWorlds.length;
  const progressPercent = Math.round((completedCount / 7) * 100);

  // Check if eligible for Certificate of Mastery (completed World 7 / Boss)
  const canClaimCert = completedWorlds.includes(7);

  return (
    <div className="profile-fullpage" style={{ backgroundImage: `url(${questDetailsBg})` }}>
      {/* 1. Header Navigation Bar */}
      <div className="profile-header-nav">
        <button className="profile-back-btn" onClick={() => navigate(-1)}>
          ← BACK
        </button>
        <h1 className="profile-main-title">Hero Chronicle</h1>
        <div style={{ width: "80px" }}></div> {/* Balance spacer */}
      </div>

      <div className="profile-container">
        
        {/* ========================================================
           LEFT PANEL: Hero Identity & Customisation
           ======================================================== */}
        <div className="profile-card identity-panel">
          <div className="card-decor-top"></div>
          
          <h3 className="panel-title">Hero Portrait</h3>
          
          <div className="hero-portrait-frame">
            <img 
              src={getAvatarImage(avatar)} 
              alt="Active Hero Portrait" 
              className="hero-portrait-image" 
            />
          </div>

          <div className="hero-identity-details">
            {isEditing ? (
              <form onSubmit={handleSaveName} className="rename-form">
                <input 
                  type="text" 
                  value={tempName} 
                  onChange={(e) => setTempName(e.target.value)}
                  maxLength={18}
                  className="rename-input"
                  placeholder="Enter name..."
                  autoFocus
                />
                <div className="rename-actions">
                  <button type="submit" className="save-name-btn">SAVE</button>
                  <button type="button" className="cancel-name-btn" onClick={() => { setTempName(username); setIsEditing(false); }}>CANCEL</button>
                </div>
              </form>
            ) : (
              <div className="username-display-row">
                <span className="hero-display-name">{username}</span>
                <button className="edit-name-btn" onClick={() => setIsEditing(true)} title="Rename Hero">
                  ✏️
                </button>
              </div>
            )}
            <span className="hero-title-tag">
              👑 {heroTitle || (totalXP >= 1500 ? "Champion" : totalXP >= 600 ? "Knight" : totalXP >= 150 ? "Apprentice" : "Novice")}
            </span>
          </div>

          {/* Customize Avatar Button - redirects directly to the other page's route */}
          <div className="portrait-picker-box">
            <button 
              className="edit-avatar-link-btn"
              onClick={() => navigate("/avatar-edit")}
              title="Edit your character model"
            >
              🎭 Edit Avatar Model
            </button>
          </div>

          <div className="card-decor-bottom"></div>
        </div>

        {/* ========================================================
           MIDDLE PANEL: RPG Stats & Progress
           ======================================================== */}
        <div className="profile-card stats-panel">
          <div className="card-decor-top"></div>
          
          <h3 className="panel-title">Character Attributes</h3>

          <div className="rpg-stats-grid">
            <div className="stat-pill xp-pill">
              <span className="stat-icon">⚡</span>
              <div className="stat-column">
                <span className="stat-label">EXP Gained</span>
                <span className="stat-value">{totalXP} XP</span>
              </div>
            </div>

            <div className="stat-pill coins-pill">
              <span className="stat-icon">🪙</span>
              <div className="stat-column">
                <span className="stat-label">Coins Banked</span>
                <span className="stat-value">{totalCoins} Coins</span>
              </div>
            </div>
          </div>

          <div className="course-progress-section">
            <h4 className="section-label">Active Quest Path</h4>
            <span className="active-path-title">
              🛡️ {selectedPath === "frontend" ? "Front-End Sorcerer Path" : "Selected Path: " + (selectedPath || "None")}
            </span>
            
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
              <span className="progress-bar-label">{progressPercent}% Conquered</span>
            </div>
            
            <span className="progress-bar-subtitle">{completedCount} of 7 Worlds Cleared</span>
          </div>

          {/* Certificate Claim Area */}
          <div className="certificate-unlock-box">
            {(hasCertificate || completedWorlds.includes(7)) ? (
              <button className="claim-certificate-btn" onClick={() => setShowCert(true)}>
                📜 VIEW SCROLL OF MASTERY
              </button>
            ) : (
              <div className="certificate-locked-state">
                <span>🔒 Mastery Certificate Locked</span>
                <p className="cert-lock-desc">Defeat the guardian of World 7 to unlock your formal scroll of certification.</p>
              </div>
            )}
          </div>

          <div className="card-decor-bottom"></div>
        </div>

        {/* ========================================================
           RIGHT PANEL: Loot & World Achievements
           ======================================================== */}
        <div className="profile-card achievements-panel">
          <div className="card-decor-top"></div>
          
          <h3 className="panel-title">Loot & Achievements</h3>

          <div className="world-achievements-list">
            {WORLD_REWARDS_MAP.map((reward) => {
              const completed = completedWorlds.includes(reward.id);
              const isEquipped = inventory.includes(reward.item);
              return (
                <div key={reward.id} className={`world-reward-row ${completed ? "completed" : "locked"}`}>
                  
                  {/* Badge Frame */}
                  <div className="reward-badge-col">
                    <span className="reward-badge-emoji">{completed ? reward.badge.split(" ")[0] : "🔒"}</span>
                    <span className="reward-badge-name">{completed ? reward.badge.split(" ").slice(1).join(" ") : `World ${reward.id} Locked`}</span>
                  </div>

                  {/* Loot Item Frame */}
                  <div className={`reward-item-col ${isEquipped ? "equipped" : ""}`}>
                    <span className="reward-item-emoji">{completed ? reward.item.split(" ")[0] : "❓"}</span>
                    <div className="reward-item-texts">
                      <span className="reward-item-name">{completed ? reward.item.split(" ").slice(1).join(" ") : "Locked Loot"}</span>
                      <span className="reward-item-slot">{completed ? `${reward.type} (${isEquipped ? "Equipped" : "Inventory"})` : "TBD"}</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          <div className="card-decor-bottom"></div>
        </div>

      </div>

      {/* ========================================================
         MASTERY CERTIFICATE MODAL SCREEN
         ======================================================== */}
      {showCert && (
        <CertificateModal
          onClose={() => setShowCert(false)}
          pathName={selectedPath === "frontend" ? "HTML & CSS Web Mastery" : "Full Stack Web Mastery"}
          xp={totalXP}
          coins={totalCoins}
        />
      )}

    </div>
  );
}

export default ProfilePage;
