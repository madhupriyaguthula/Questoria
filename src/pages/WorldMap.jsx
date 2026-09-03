import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { worlds } from "../data/questData";
import worldMapBg from "../assets/worldmap-bg.png";
import QuickNav from "../components/QuickNav";
import avatarHero from "../assets/avatar-hero.png";
import heroPortrait from "../assets/hero.png";
import saintPortrait from "../assets/saint-portrait.png";
import charFemale from "../assets/char-female.png";
import charMale from "../assets/char-male.png";
import "./WorldMap.css"; // Imports character sheet popup styles

const PORTRAITS = {
  "female": charFemale,
  "male": charMale,
  "char-female.png": charFemale,
  "char-male.png": charMale,
  "avatar-hero.png": avatarHero,
  "hero.png": heroPortrait,
  "saint-portrait.png": saintPortrait
};

const nodePositions = {
  1: { top: "75%", left: "10%" },
  2: { top: "35%", left: "20%" },
  3: { top: "28%", left: "45%" },
  4: { top: "62%", left: "52%" },
  5: { top: "68%", left: "76%" },
  6: { top: "35%", left: "64%" },
  7: { top: "28%", left: "85%" },
};

const worldIcons = {
  1: "🌱", 
  2: "📜", 
  3: "⚡", 
  4: "🧩", 
  5: "🗝️", 
  6: "⚒️", 
  7: "🐉", 
};

// Maps inventory item substrings to their corresponding slots
const getEquippedGear = (inv) => {
  const gear = {
    head: null,
    body: null,
    hands: null,
    feet: null,
    accessory: null
  };

  inv.forEach((item) => {
    if (item.includes("Boots")) {
      gear.feet = item;
    } else if (item.includes("Gloves") || item.includes("Gauntlet")) {
      gear.hands = item;
    } else if (item.includes("Cloak") || item.includes("Armor")) {
      gear.body = item;
    } else if (item.includes("Hat") || item.includes("Cap") || item.includes("Headband")) {
      gear.head = item;
    } else if (item.includes("Amulet") || item.includes("Charm") || item.includes("Scroll") || item.includes("Lens")) {
      gear.accessory = item;
    }
  });

  return gear;
};

function WorldMap({ completedWorlds, selectedPath, totalXP, totalCoins, heroTitle, inventory = [], resetCourseProgress, avatar }) {
  const navigate = useNavigate();

  const isUnlocked = (world) => world.id === 1 || completedWorlds.includes(world.id - 1);
  const filteredWorlds = worlds.filter((w) => w.pathId === selectedPath);

  const gear = getEquippedGear(inventory);

  return (
    <div className="world-map-fullpage" style={{ backgroundImage: `url(${worldMapBg})` }}>
      <QuickNav />
      
      {/* Dynamic Reset Game Button for testing progression */}
      <button 
        className="reset-progress-btn"
        onClick={(e) => {
          e.stopPropagation();
          if (window.confirm("Are you sure you want to reset this course's progress?")) {
            resetCourseProgress();
          }
        }}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "24px",
          background: "#3a1313",
          border: "1px solid #7d2a2a",
          color: "#f1948a",
          padding: "6px 14px",
          fontFamily: "'Cinzel', serif",
          fontSize: "10px",
          borderRadius: "4px",
          cursor: "pointer",
          zIndex: 100,
          boxShadow: "0 2px 8px rgba(0,0,0,0.5)"
        }}
      >
        ⚠️ RESET GAME
      </button>

      {/* Top Status Bar HUD */}
      <div className="status-bar-overlay">
        <h1>Questoria — World Map</h1>
        <div className="status-bar">
          <span>⚡ {totalXP} XP</span>
          <span>🪙 {totalCoins} Coins</span>
          {heroTitle && <span className="hero-tag">👑 {heroTitle}</span>}
          <span 
            onClick={() => navigate("/profile")}
            style={{ color: "var(--gold)", marginLeft: "10px", fontSize: "0.8rem", textDecoration: "underline", cursor: "pointer" }}
          >
            [Open Hero Sheet]
          </span>
        </div>
      </div>

      {/* Render Nodes on Map */}
      {filteredWorlds.map((world) => {
        const unlocked = isUnlocked(world);
        const pos = nodePositions[world.id] || { top: "50%", left: "50%" };
        return (
          <div
            key={world.id}
            className={`map-node ${unlocked ? "unlocked" : "locked"}`}
            style={{ top: pos.top, left: pos.left }}
            onClick={() => unlocked && navigate(`/quest/${world.id}`)}
          >
            <span className="node-icon">{unlocked ? worldIcons[world.id] : "🔒"}</span>
            <span className="node-label">{world.title}</span>
            {completedWorlds.includes(world.id) && <span className="node-check">✅</span>}
          </div>
        );
      })}

      {/* Render Map Avatar */}
      {(() => {
        const currentWorldId = completedWorlds.length > 0
          ? Math.min(Math.max(...completedWorlds) + 1, 7)
          : 1;
        const avatarPos = nodePositions[currentWorldId] || { top: "50%", left: "50%" };
        const mapAvatarSrc = PORTRAITS[avatar] || (typeof avatar === "string" && avatar.startsWith("data:") ? avatar : charFemale);
        return (
          <img
            src={mapAvatarSrc}
            alt="Your hero"
            className="map-avatar"
            style={{ top: avatarPos.top, left: avatarPos.left }}
          />
        );
      })()}
    </div>
  );
}

export default WorldMap;