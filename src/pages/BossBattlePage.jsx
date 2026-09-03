import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { worlds, damageMap } from "../data/questData";
import avatarHero from "../assets/avatar-hero.png";
import charFemale from "../assets/char-female.png";
import charMale from "../assets/char-male.png";
import petWolf from "../assets/pet-wolf.png";
import petDragon from "../assets/pet-dragon.png";
import bossMonster from "../assets/boss-monster.png";
import bossArenaBg from "../assets/boss-arena-bg.png";
import "./BossBattlePage.css"; // Imports the high-fidelity boss battle arena styling

const PORTRAITS = {
  "female": charFemale,
  "male": charMale,
  "char-female.png": charFemale,
  "char-male.png": charMale,
  "avatar-hero.png": avatarHero,
};

const PETS = {
  "female": petWolf,
  "male": petDragon,
  "char-female.png": petWolf,
  "char-male.png": petDragon,
};

const HERO_TITLES = {
  "female": { title: "THE SEEKER", subtitle: "Village Keeper & Wolf Companion" },
  "male": { title: "THE WANDERER", subtitle: "Village Traveler & Dragon Companion" },
};

function BossBattlePage({ avatar: avatarProp }) {
  const savedAvatar = localStorage.getItem("avatar") ? JSON.parse(localStorage.getItem("avatar")) : "female";
  const savedPet = localStorage.getItem("questoria_pet");
  
  const avatarKey = avatarProp || savedAvatar || "female";
  const currentAvatarImg = PORTRAITS[avatarKey] || (typeof avatarKey === "string" && avatarKey.startsWith("data:") ? avatarKey : charFemale);
  
  // Resolve pet companion
  let currentPetImg = PETS[avatarKey] || petWolf;
  if (savedPet === "dragon") currentPetImg = petDragon;
  if (savedPet === "wolf") currentPetImg = petWolf;

  const heroMeta = HERO_TITLES[avatarKey] || { title: "HERO", subtitle: "The Legendary Warrior" };

  const { worldId } = useParams();
  const navigate = useNavigate();
  const world = worlds.find((w) => w.id === parseInt(worldId));
  const [current, setCurrent] = useState(0);
  const [playerHP, setPlayerHP] = useState(100);
  const [bossHP, setBossHP] = useState(100);
  const [selected, setSelected] = useState(null);
  const [hitTarget, setHitTarget] = useState(null);

  if (!world) return <p>World not found.</p>;

  const question = world.bossQuestions[current];
  const damage = damageMap[question.difficulty];

  const handleNext = () => {
    let newPlayerHP = playerHP;
    let newBossHP = bossHP;
    const isCorrect = selected === question.correctAnswer;

    if (isCorrect) {
      newBossHP = Math.max(0, bossHP - damage);
      setBossHP(newBossHP);
      setHitTarget("boss");
    } else {
      newPlayerHP = Math.max(0, playerHP - damage);
      setPlayerHP(newPlayerHP);
      setHitTarget("player");
    }

    setTimeout(() => {
      setHitTarget(null);
      if (current < world.bossQuestions.length - 1 && newPlayerHP > 0 && newBossHP > 0) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        const result = newPlayerHP > newBossHP ? "win" : "lose";
        navigate(`/reward/${world.id}`, { state: { battleResult: result, playerHP: newPlayerHP, bossHP: newBossHP } });
      }
    }, 500);
  };

  return (
    <div className="boss-battle-fullpage" style={{ backgroundImage: `url(${bossArenaBg})` }}>
      <div className="boss-battle-content">
        <div className="boss-battle-header">
          <button className="back-btn" onClick={() => navigate("/worldmap")}>← World Map</button>
          <h2>{world.title}</h2>
        </div>

        <div className="boss-arena-wide">
          {/* Left Side: Player Hero & Companion Duo */}
          <div className="fighter-side fighter-left">
            <div className="fighter-hp-bar">
              <div className="hp-fill player-hp" style={{ width: `${playerHP}%` }}></div>
            </div>
            
            <div className={`hero-duo-stage ${hitTarget === "player" ? "fighter-hit" : ""}`}>
              <img 
                src={currentAvatarImg} 
                alt="Hero" 
                className="duo-hero-img" 
              />
              {currentPetImg && (
                <img 
                  src={currentPetImg} 
                  alt="Companion" 
                  className="duo-pet-img" 
                />
              )}
              <div className="duo-pedestal-glow"></div>
            </div>

            <div className="fighter-badge-card">
              <span className="badge-title">{heroMeta.title}</span>
              <span className="badge-subtitle">{heroMeta.subtitle}</span>
            </div>
          </div>

          {/* Center Column: Question Card & Attack Trigger */}
          <div className="battle-center">
            <div className="center-gem-ornament"></div>
            <p className="progress-tag">Question {current + 1}/40 ({question.difficulty})</p>
            <p className="boss-question">{question.question}</p>
            
            <div className="options">
              {question.options.map((opt, i) => {
                const letters = ["A", "B", "C", "D"];
                return (
                  <button
                    key={opt}
                    className={`option-btn ${selected === opt ? "selected" : ""}`}
                    onClick={() => setSelected(opt)}
                  >
                    <span className="option-diamond">
                      <span className="option-letter">{letters[i]}</span>
                    </span>
                    <span className="option-text">{opt}</span>
                  </button>
                );
              })}
            </div>
            
            <button 
              className="attack-btn" 
              disabled={!selected} 
              onClick={handleNext}
            >
              Attack
            </button>
          </div>

          {/* Right Side: Boss Monster */}
          <div className="fighter-side fighter-right">
            <div className="fighter-hp-bar">
              <div className="hp-fill boss-hp-fill" style={{ width: `${bossHP}%` }}></div>
            </div>
            <img 
              src={bossMonster} 
              alt="Boss" 
              className={`fighter-img-lg ${hitTarget === "boss" ? "fighter-hit" : ""}`} 
            />
            <div className="fighter-badge-card">
              <span className="badge-title">GUARDIAN</span>
              <span className="badge-subtitle">The Ancient Protector</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BossBattlePage;