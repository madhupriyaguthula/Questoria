import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { worlds } from "../data/questData";
import treasureVaultBg from "../assets/treasure_vault_bg.png";
import CertificateModal from "../components/CertificateModal";
import "./RewardScreen.css"; // Imports victory animations

// Pre-defined list of random particle attributes for decoration
const CONFETTI_PARTICLES = Array.from({ length: 65 }).map((_, i) => {
  const colors = ["#ffd700", "#d4af37", "#00bfff", "#ff4757", "#2ed573", "#eccc68"];
  return {
    id: i,
    left: Math.random() * 96 + 2,
    top: Math.random() * 90 + 5,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 2,
    size: Math.random() * 8 + 4
  };
});

function RewardScreen({ markWorldComplete, addRewards, setHasCertificate, addToInventory }) {
  const { worldId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const world = worlds.find((w) => w.id === parseInt(worldId));
  const state = location.state || {};

  const [stage, setStage] = useState("chest"); // "chest" | "celebration" | "reveal"
  const [opening, setOpening] = useState(false);
  const [celebrationCount, setCelebrationCount] = useState(5);
  const [claimedList, setClaimedList] = useState([]);
  const [showCert, setShowCert] = useState(false);

  // Local HUD stats counters
  const [currentTotalXP, setCurrentTotalXP] = useState(() => {
    const saved = localStorage.getItem("totalXP");
    return saved ? JSON.parse(saved) : 0;
  });
  const [currentTotalCoins, setCurrentTotalCoins] = useState(() => {
    const saved = localStorage.getItem("totalCoins");
    return saved ? JSON.parse(saved) : 0;
  });

  const renderHUD = () => (
    <div className="player-hud-widget">
      <div className="hud-stat-item xp">
        <span className="hud-icon">💎</span>
        <span className="hud-val">{currentTotalXP} XP</span>
      </div>
      <div className="hud-stat-item coins">
        <span className="hud-icon">🪙</span>
        <span className="hud-val">{currentTotalCoins} Coins</span>
      </div>
    </div>
  );

  // 5-second countdown timer for celebration phase
  useEffect(() => {
    if (stage === "celebration") {
      const interval = setInterval(() => {
        setCelebrationCount((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setStage("reveal");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [stage]);

  if (!world) return <p className="quest-error-text">World not found.</p>;

  const isBoss = world.isBossWorld;
  const isProject = world.isMiniProject;
  const won = isBoss ? state.battleResult === "win" : true;

  // Build the list of rewards with their values and icons dynamically
  const rewardsList = [];
  if (won) {
    // 1. XP Reward
    const xpVal = isBoss ? world.rewards.xp : (isProject ? world.rewards.xp : state.totalXP);
    rewardsList.push({
      id: "xp",
      label: "XP Points",
      value: `+${xpVal}`,
      rawVal: xpVal,
      icon: "💎"
    });

    // 2. Coins Reward
    const coinsVal = isBoss ? world.rewards.coins : (isProject ? world.rewards.coins : state.totalCoins);
    rewardsList.push({
      id: "coins",
      label: "Gold Coins",
      value: `+${coinsVal}`,
      rawVal: coinsVal,
      icon: "🪙"
    });

    // 3. Equipment Reward
    const equipVal = isBoss ? world.rewards.equipment : (isProject ? world.rewards.equipment : world.rewards.equipment);
    if (equipVal) {
      rewardsList.push({
        id: "equipment",
        label: "Equipment Item",
        value: equipVal,
        rawVal: equipVal,
        icon: "🛡️"
      });
    }

    // 4. Boss Certificate Badge
    if (isBoss) {
      rewardsList.push({
        id: "certificate",
        label: "Honorary Badge",
        value: "Elite Player",
        rawVal: true,
        icon: "📜"
      });
    }
  }

  const handleOpenChest = () => {
    setOpening(true);
    // Let chest shake for 600ms before starting celebration countdown
    setTimeout(() => {
      setStage("celebration");
    }, 600);
  };

  const handleClaimItem = (item) => {
    if (claimedList.includes(item.id)) return;

    // Apply the reward to global state on claim click
    if (item.id === "xp") {
      addRewards(item.rawVal, 0);
      setCurrentTotalXP((prev) => prev + item.rawVal);
    } else if (item.id === "coins") {
      addRewards(0, item.rawVal);
      setCurrentTotalCoins((prev) => prev + item.rawVal);
    } else if (item.id === "equipment") {
      addToInventory(item.rawVal);
    } else if (item.id === "certificate") {
      setHasCertificate(true);
      setShowCert(true);
    }

    setClaimedList((prev) => [...prev, item.id]);
  };

  const handleContinue = () => {
    if (won) {
      markWorldComplete(world.id);
    }
    navigate(won || isProject ? "/worldmap" : `/boss/${world.id}`);
  };

  // Check if everything is claimed to unlock the final map button
  const allClaimed = won ? rewardsList.every(item => claimedList.includes(item.id)) : true;
  const isContinueDisabled = won && !allClaimed;

  return (
    <div 
      className="reward-screen-fullpage"
      style={{ 
        backgroundImage: `url(${treasureVaultBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        overflow: "hidden"
      }}
    >
      {renderHUD()}
      <div className="reward-layout-box">
        
        {/* STAGE 1: THE UNOPENED CHEST */}
        {stage === "chest" && (
          <div className="chest-display-container">
            <h2 className="reward-main-title">
              {isBoss && !won ? "BATTLE DEFEATED" : "WORLD COMPLETED!"}
            </h2>
            <p className="reward-subtitle">
              {isBoss && !won 
                ? "You fought valiantly, but the Guardian emerged victorious." 
                : "You have conquered this region! Open the chest to unlock your treasures."
              }
            </p>

            {isBoss && !won ? (
              <div className="rpg-chest-graphic">💀</div>
            ) : (
              <div 
                className={`rpg-chest-graphic ${opening ? "opening" : ""}`}
                onClick={handleOpenChest}
              >
                📦
              </div>
            )}

            <button 
              className="reward-continue-btn"
              onClick={isBoss && !won ? handleContinue : handleOpenChest}
            >
              {isBoss && !won ? "RETRY BATTLE" : "OPEN TREASURE CHEST"}
            </button>
          </div>
        )}

        {/* STAGE 2: 5-SECOND PARTICLE CELEBRATION */}
        {stage === "celebration" && (
          <div className="celebration-timer-container">
            <h2 className="reward-main-title">UNLOCkING REWARDS</h2>
            <p className="reward-subtitle">The magic flows from the ancient vault...</p>
            
            <div className="celebration-glow-circle">
              {celebrationCount}
            </div>

            {/* Float floating confetti details */}
            {CONFETTI_PARTICLES.map((p) => (
              <div 
                key={p.id}
                className="confetti-particle"
                style={{
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  backgroundColor: p.color,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  animation: `pulse-glow 1s infinite alternate`,
                  animationDelay: `${p.delay}s`
                }}
              />
            ))}
          </div>
        )}

        {/* STAGE 3: CHOOSE / REVEAL AND CLAIM SIDE-BY-SIDE CARDS */}
        {stage === "reveal" && (
          <>
            <div className="reveal-header-block">
              <h2 className="reward-main-title">CLAIM YOUR BOOTY!</h2>
              {isBoss && <p className="reward-subtitle">Score: {state.score}/{state.total} | Boss Guardian Defeated!</p>}
              {!isBoss && <p className="reward-subtitle">Congratulations! Claim each box to claim your map progression.</p>}
            </div>

            <div className="rewards-cards-grid">
              {rewardsList.map((item) => {
                const isClaimed = claimedList.includes(item.id);
                return (
                  <div 
                    key={item.id}
                    className={`reward-box-card revealed ${isClaimed ? "claimed" : ""}`}
                  >
                    <span className="reward-card-icon">{item.icon}</span>
                    <div className="reward-card-text">
                      <h5 className="reward-card-value">{item.value}</h5>
                      <span className="reward-card-label">{item.label}</span>
                    </div>

                    <button 
                      className={`reward-claim-mini-btn ${isClaimed ? "claimed-state" : ""}`}
                      disabled={isClaimed}
                      onClick={() => handleClaimItem(item)}
                    >
                      {isClaimed ? "Claimed ✔" : "Claim"}
                    </button>
                  </div>
                );
              })}
            </div>

            <button 
              className="reward-continue-btn"
              disabled={isContinueDisabled}
              onClick={handleContinue}
            >
              CONTINUE TO WORLD MAP
            </button>

            {isBoss && (
              <button 
                className="reward-continue-btn"
                style={{ 
                  background: "linear-gradient(180deg, #ffd700 0%, #b8860b 100%)", 
                  color: "#1a0f00", 
                  marginTop: "12px", 
                  border: "2px solid #ffe3a0",
                  fontWeight: "800"
                }}
                onClick={() => setShowCert(true)}
              >
                📜 VIEW VINTAGE CERTIFICATE OF MASTERY
              </button>
            )}
          </>
        )}

      </div>

      {showCert && (
        <CertificateModal
          onClose={() => setShowCert(false)}
          pathName={world?.title || "HTML & Web Mastery"}
          xp={currentTotalXP}
          coins={currentTotalCoins}
        />
      )}
    </div>
  );
}

export default RewardScreen;