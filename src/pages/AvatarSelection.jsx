// src/pages/AvatarSelection.jsx
// QUESTORIA — Avatar Selection Page (v2, AAA Quality Rebuild)
//
// ── BACKEND INTEGRATION POINTS ───────────────────────────────────────────────
// 1. On Continue → POST /api/player/create
//    Body: { avatarId: 'female'|'male', heroName: string, petId: 'wolf'|'dragon' }
//    Save: localStorage.setItem('questoria_player_id', res.id)
//          localStorage.setItem('questoria_avatar', selected)
//
// 2. Inventory panel → GET /api/inventory/:playerId
//    Render each item in the .inv-slot grid inside InventoryPanel
//
// 3. Pet unlocks → GET /api/pets/unlocked/:playerId
//    Cross-reference LOCKED_PETS array to conditionally unlock them
//
// 4. XP / Coins / Level → import { getPlayer } from '../services/playerService'
//    Use to display stat badges or player level on the card
//
// 5. After save → navigate('/village')
//    Village reads: localStorage.getItem('questoria_avatar')
// ──────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './AvatarSelection.css';

// Scene background
import avatarBg   from '../assets/Backgrounds/fantasy-bg.png';
// Character portraits (transparent PNG — no background)
import charFemale from '../assets/char-female.png';
import charMale   from '../assets/char-male.png';

function TreasureChestIcon({ className, ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6 10V8a2 2 0 012-2h8a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="4" y="10" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 14h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 6v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// ── Pet image paths ───────────────────────────────────────────────────────────
// SETUP: Save your pet images to:
//   src/assets/pet-dragon.png   ← crop the dragon from the combined pets image
//   src/assets/pet-wolf.png     ← crop the wolf   from the combined pets image
// The PetDisplay component below uses onError to fall back to emoji gracefully.
// ──────────────────────────────────────────────────────────────────────────────
const PET_SRCS = {
  dragon: new URL('../assets/pet-dragon.png', import.meta.url).href,
  wolf:   new URL('../assets/pet-wolf.png',   import.meta.url).href,
};

// ════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENT: SUMMONING CIRCLE (SVG magic ring under hero feet)
// ════════════════════════════════════════════════════════════════════════════
function SummoningCircle() {
  return (
    <svg className="summon-circle" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sc-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#f5c842" stopOpacity="0.6"/>
          <stop offset="55%"  stopColor="#f5c842" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#f5c842" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Core gold glow fill */}
      <circle cx="120" cy="120" r="118" fill="url(#sc-core)"/>

      {/* Rings */}
      <circle cx="120" cy="120" r="112" fill="none" stroke="#f5c842" strokeWidth="1.5"  opacity="0.9" strokeDasharray="12 6"/>
      <circle cx="120" cy="120" r="96"  fill="none" stroke="#e8b830" strokeWidth="0.8"  opacity="0.6"/>
      <circle cx="120" cy="120" r="80"  fill="none" stroke="#f5c842" strokeWidth="1"    opacity="0.5" strokeDasharray="6 9"/>
      <circle cx="120" cy="120" r="60"  fill="none" stroke="#c9a84c" strokeWidth="0.6"  opacity="0.4"/>

      {/* 8-point star */}
      <polygon
        points="120,16 134,92 210,78 148,120 210,162 134,148 120,224 106,148 30,162 92,120 30,78 106,92"
        fill="none" stroke="#f5c842" strokeWidth="1.2" opacity="0.7"
      />

      {/* Dot accents on outer ring */}
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <circle
            key={i}
            cx={120 + 110 * Math.cos(rad)}
            cy={120 + 110 * Math.sin(rad)}
            r="2.5" fill="#f5c842" opacity="0.85"
          />
        );
      })}

      {/* Center rings */}
      <circle cx="120" cy="120" r="22" fill="none" stroke="#f5c842" strokeWidth="1.5" opacity="0.5"/>
      <circle cx="120" cy="120" r="10" fill="#f5c842" opacity="0.18"/>

      {/* Ancient rune marks at cardinal points */}
      <text x="113" y="10"   fontSize="9" fill="#f5c842" opacity="0.85" fontFamily="serif">ᚠ</text>
      <text x="220" y="125" fontSize="9" fill="#f5c842" opacity="0.85" fontFamily="serif">ᚢ</text>
      <text x="113" y="238" fontSize="9" fill="#f5c842" opacity="0.85" fontFamily="serif">ᚦ</text>
      <text x="6"   y="125" fontSize="9" fill="#f5c842" opacity="0.85" fontFamily="serif">ᚨ</text>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENT: PARTICLES (gold atmospheric dust floating upward)
// ════════════════════════════════════════════════════════════════════════════
function Particles() {
  return (
    <div className="av-particles" aria-hidden="true">
      {Array.from({ length: 30 }).map((_, i) => (
        <span key={i} className="av-particle" style={{ '--i': i }}/>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENT: HERO NAME INPUT (editable fantasy-styled text field)
// ════════════════════════════════════════════════════════════════════════════
function HeroNameInput({ value, onChange, placeholder }) {
  return (
    <div className="hero-name-wrap">
      <input
        className="hero-name-input"
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={24}
        spellCheck={false}
        autoComplete="off"
        aria-label="Choose your hero's name"
        /* Stop card's onClick from triggering on input focus */
        onClick={e => e.stopPropagation()}
        onKeyDown={e => e.stopPropagation()}
      />
      {/* Decorative sparkle inside the input */}
      <span className="hero-name-input__star" aria-hidden="true">✦</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENT: PET DISPLAY (actual image with emoji fallback)
// ════════════════════════════════════════════════════════════════════════════
function PetDisplay({ petType, size = 'card' }) {
  const [imgError, setImgError] = useState(false);
  const fallbackEmoji = petType === 'wolf' ? '🐺' : '🐉';
  const altText       = petType === 'wolf'
    ? 'Fantasy wolf companion with glowing blue eyes'
    : 'Baby dragon companion with flame horns';

  return (
    <div className={`pet-display pet-display--${size}${imgError ? ' pet-display--fallback' : ''}`}>
      {!imgError ? (
        <img
          src={PET_SRCS[petType]}
          alt={altText}
          className="pet-display__img"
          onError={() => setImgError(true)}
          draggable="false"
        />
      ) : (
        /* Emoji fallback — shows if pet image files haven't been added yet */
        <span className="pet-display__emoji">{fallbackEmoji}</span>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENT: LOCKED PET CHIP (greyed out, future unlocks)
// ════════════════════════════════════════════════════════════════════════════
function LockedPet({ emoji, name }) {
  return (
    <div
      className="pet-locked"
      title="Unlock at higher levels"
      role="img"
      aria-label={`${name} — locked companion`}
    >
      <span className="pet-locked__emoji">{emoji}</span>
      <span className="pet-locked__lock">🔒</span>
      <span className="pet-locked__name">{name}</span>
      {/* Tooltip on hover */}
      <span className="pet-locked__tooltip">Unlock at higher levels</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENT: PET CHOOSER DROPDOWN
// ════════════════════════════════════════════════════════════════════════════
function PetChooser({ current, onChoose, onClose }) {
  return (
    <div className="pet-chooser" role="dialog" aria-label="Choose companion" aria-modal="true">
      <div className="pet-chooser__head">
        <span className="pet-chooser__title">🐾 Choose Companion</span>
        <button
          className="pet-chooser__x"
          onClick={onClose}
          type="button"
          aria-label="Close companion chooser"
        >✕</button>
      </div>

      {/* ── Unlocked companions ── */}
      <div className="pet-chooser__unlocked">
        {[
          { id: 'wolf',   label: 'Wolf'   },
          { id: 'dragon', label: 'Dragon' },
        ].map(p => (
          <button
            key={p.id}
            className={`pet-opt${current === p.id ? ' pet-opt--active' : ''}`}
            onClick={() => onChoose(p.id)}
            type="button"
            aria-pressed={current === p.id}
          >
            {/* Show actual pet image thumbnail in chooser */}
            <div className="pet-opt__img-wrap">
              <PetDisplay petType={p.id} size="chooser"/>
            </div>
            <span className="pet-opt__name">{p.label}</span>
            {current === p.id && <span className="pet-opt__check">✓</span>}
          </button>
        ))}
      </div>

      {/* ── Locked / future companions ── */}
      {/* BACKEND HOOK: replace static list with GET /api/pets/unlocked/:playerId */}
      <p className="pet-chooser__locked-label">⚔ Future Companions</p>
      <div className="pet-chooser__locked-row">
        <LockedPet emoji="🦅" name="Griffin"/>
        <LockedPet emoji="🦊" name="Fox Spirit"/>
        <LockedPet emoji="🔥" name="Phoenix"/>
        <LockedPet emoji="🦉" name="Owl"/>
        <LockedPet emoji="🦄" name="Unicorn"/>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENT: INVENTORY PANEL (placeholder modal — 20 empty slots)
// BACKEND HOOK: GET /api/inventory/:playerId → render items in .inv-slot grid
// ════════════════════════════════════════════════════════════════════════════
function InventoryPanel({ onClose }) {
  return (
    <div
      className="inv-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Inventory"
    >
      <div className="inv-panel" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="inv-panel__header">
          <div className="inv-panel__title-row">
            <TreasureChestIcon className="inv-panel__icon" />
            <h2 className="inv-panel__title">Inventory</h2>
          </div>
          <button
            className="inv-panel__close"
            onClick={onClose}
            type="button"
            aria-label="Close inventory"
          >✕</button>
        </div>

        {/* Body — empty slots grid */}
        <div className="inv-panel__body">
          <div className="inv-grid">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="inv-slot">
                <span className="inv-slot__plus">＋</span>
              </div>
            ))}
          </div>
          <p className="inv-empty">Your satchel is empty.</p>
          <p className="inv-hint">
            Armor, potions, and relics collected on your journey will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// HERO STATIC DATA
// When backend is ready, fetch this from GET /api/avatars instead
// ════════════════════════════════════════════════════════════════════════════
const HEROES = {
  female: {
    id:          'female',
    defaultName: 'The Seeker',
    classLabel:  'Village Keeper',
    description: 'Kind, brave, and wise. She carries the village\'s heart and the spirit of a rising legend.',
    stats:       [
      { icon: '✨', label: 'Wisdom',  bonus: '+2' },
      { icon: '💚', label: 'Healing', bonus: '+1' },
    ],
    defaultPet: 'wolf',
    src:        charFemale,
    alt:        'Female hero — village keeper',
  },
  male: {
    id:          'male',
    defaultName: 'The Wanderer',
    classLabel:  'Village Traveler',
    description: 'Curious, bold, and restless. A peaceful villager destined to become a legendary warrior.',
    stats:       [
      { icon: '⚔️', label: 'Strength', bonus: '+2' },
      { icon: '🏃', label: 'Agility',  bonus: '+1' },
    ],
    defaultPet: 'dragon',
    src:        charMale,
    alt:        'Male hero — village traveler',
  },
};

// ════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENT: HERO CARD (reusable for both male and female)
// ════════════════════════════════════════════════════════════════════════════
function HeroCard({
  hero,
  selected, hovered,
  heroName, petType, petOpen,
  onSelect, onHoverIn, onHoverOut,
  onNameChange,
  onPetToggle, onPetChoose, onPetClose,
}) {
  const isSelected = selected === hero.id;
  const isHovered  = hovered  === hero.id;
  const isPetOpen  = petOpen  === hero.id;

  return (
    <div
      className={[
        'av-card',
        isSelected ? 'av-card--selected' : '',
        isHovered  ? 'av-card--hovered'  : '',
      ].filter(Boolean).join(' ')}
      onClick={() => onSelect(hero.id)}
      onMouseEnter={() => onHoverIn(hero.id)}
      onMouseLeave={() => onHoverOut()}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Select hero: ${heroName || hero.defaultName}`}
      onKeyDown={e => e.key === 'Enter' && onSelect(hero.id)}
    >
      {/* ── Outer golden glow border ── */}
      <div className="av-card__glow" aria-hidden="true"/>

      {/* ── CHARACTER IMAGE AREA ── */}
      <div className="av-card__stage">
        {/* Ground mist atmosphere */}
        <div className="av-card__mist" aria-hidden="true"/>

        {/* Ground shadow ellipse under hero */}
        <div className="av-card__shadow" aria-hidden="true"/>

        {/* Summoning circle — only visible when this hero is selected */}
        {isSelected && (
          <div className="av-card__summon" aria-hidden="true">
            <SummoningCircle/>
          </div>
        )}

        {/* Hero portrait — transparent PNG, no background, no text, no UI on image */}
        <img
          src={hero.src}
          alt={hero.alt}
          className="av-card__img"
          draggable="false"
        />

        {/* Pet companion — floats beside hero at bottom right */}
        <div className="av-card__pet-stage" aria-label={`${petType} companion`}>
          <PetDisplay petType={petType} size="card"/>
        </div>

      </div>

      {/* ── INFO PANEL ── */}
      <div className="av-card__info">
        {/* Class label */}
        <span className="av-card__class">{hero.classLabel}</span>

        {/* Editable hero name input */}
        <HeroNameInput
          value={heroName}
          onChange={onNameChange}
          placeholder={hero.defaultName}
        />

        {/* Lore description */}
        <p className="av-card__desc">{hero.description}</p>

        {/* Stat chips */}
        <div className="av-card__stats">
          {hero.stats.map(s => (
            <span key={s.label} className="av-stat">
              <span>{s.icon}</span>
              {s.label} <strong>{s.bonus}</strong>
            </span>
          ))}
        </div>

        {/* Current companion name */}
        <div className="av-card__companion">
          <span className="av-card__pet-label">Companion:</span>
          <span className="av-card__pet-name">
            {petType === 'wolf' ? '🐺 Wolf' : '🐉 Dragon'}
          </span>
        </div>
      </div>

      {/* ── CHANGE COMPANION BUTTON ── */}
      <button
        className="av-card__pet-btn"
        onMouseDown={e => e.stopPropagation()}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onPetToggle(hero.id);
        }}
        type="button"
        aria-expanded={isPetOpen}
        aria-controls={`pet-chooser-${hero.id}`}
      >
        <span>🐾</span> Change Companion
      </button>

      {/* ── PET CHOOSER DROPDOWN ── */}
      {isPetOpen && (
        <div id={`pet-chooser-${hero.id}`} onClick={e => e.stopPropagation()}>
          <PetChooser
            current={petType}
            onChoose={onPetChoose}
            onClose={onPetClose}
          />
        </div>
      )}

      {/* ── SELECTED BADGE (floats above card) ── */}
      {isSelected && (
        <div className="av-card__badge" role="status">✓ Selected Hero</div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT: AvatarSelection
// Route: /avatar   (already registered in App.jsx)
// ════════════════════════════════════════════════════════════════════════════
export default function AvatarSelection() {
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────────────────────
  const [selected,   setSelected]   = useState(null);     // 'female' | 'male' | null
  const [hovered,    setHovered]    = useState(null);
  const [femaleName, setFemaleName] = useState('');        // custom name for female hero
  const [maleName,   setMaleName]   = useState('');        // custom name for male hero
  const [femalePet,  setFemalePet]  = useState('wolf');    // wolf | dragon
  const [malePet,    setMalePet]    = useState('dragon');  // wolf | dragon
  const [petOpen,    setPetOpen]    = useState(null);      // 'female' | 'male' | null
  const [invOpen,    setInvOpen]    = useState(false);
  const [confirming, setConfirming] = useState(false);

  // Resolved display name for the selected hero
  const heroDisplayName = selected === 'female'
    ? (femaleName.trim() || HEROES.female.defaultName)
    : selected === 'male'
      ? (maleName.trim() || HEROES.male.defaultName)
      : '';

  // ── Close panels on Escape ─────────────────────────────────────────────
  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape') { setPetOpen(null); setInvOpen(false); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // ── Handlers ──────────────────────────────────────────────────────────
  const handleSelect = useCallback(id => {
    setSelected(id);
    setPetOpen(null); // close any open chooser on hero switch
  }, []);

  const handlePetToggle = useCallback(id => {
    setPetOpen(prev => prev === id ? null : id);
  }, []);

  // ── Continue / confirm ─────────────────────────────────────────────────
  async function handleContinue() {
    if (!selected || confirming) return;
    setConfirming(true);

    // ── BACKEND HOOK — uncomment when API is ready ──────────────────────
    // const petId  = selected === 'female' ? femalePet : malePet;
    // const hName  = selected === 'female'
    //   ? (femaleName.trim() || HEROES.female.defaultName)
    //   : (maleName.trim()   || HEROES.male.defaultName);
    //
    // const res  = await fetch('/api/player/create', {
    //   method:  'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body:    JSON.stringify({ avatarId: selected, heroName: hName, petId }),
    // });
    // const data = await res.json();
    // localStorage.setItem('questoria_player_id', data.id);
    // localStorage.setItem('questoria_avatar',    selected);
    // ───────────────────────────────────────────────────────────────────

    setTimeout(() => navigate('/village'), 1800);
  }

  // ════════════════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════════════════
  return (
    <div className="avpage">

      {/* ── BACKGROUND — fantasy village scene, faded so heroes pop ── */}
      <div
        className="avpage__bg"
        style={{ backgroundImage: `url(${avatarBg})` }}
        aria-hidden="true"
      />
      {/* Dark gradient overlay — layered for depth + readability */}
      <div className="avpage__overlay" aria-hidden="true"/>

      {/* ── ATMOSPHERIC PARTICLES — floating gold dust motes ── */}
      <Particles/>

      {/* ── INVENTORY FAB — top-right floating button ── */}
      <button
        id="inv-fab-btn"
        className="inv-fab"
        onClick={() => setInvOpen(true)}
        type="button"
        aria-label="Open inventory"
        title="Inventory"
      >
        <TreasureChestIcon className="inv-fab__icon" />
        <span className="inv-fab__ring" aria-hidden="true"/>
      </button>

      {/* ── PAGE HEADER ── */}
      <header className="avpage__header">
        <p className="avpage__eyebrow">✦ The Beginning of Your Legend ✦</p>
        <h1 className="avpage__title">Choose Your Hero</h1>
        <p className="avpage__sub">
          Your hero will carry your story across every world you conquer.
          This choice is permanent — choose wisely.
        </p>
      </header>

      {/* ── HERO STAGE — two character cards ── */}
      <div className="av-stage">

        {/* Female hero — left */}
        <HeroCard
          hero={HEROES.female}
          selected={selected}
          hovered={hovered}
          heroName={femaleName}
          petType={femalePet}
          petOpen={petOpen}
          onSelect={handleSelect}
          onHoverIn={setHovered}
          onHoverOut={() => setHovered(null)}
          onNameChange={setFemaleName}
          onPetToggle={handlePetToggle}
          onPetChoose={p => { setFemalePet(p); setPetOpen(null); }}
          onPetClose={() => setPetOpen(null)}
        />

        {/* Center sword divider */}
        <div className="av-center-divider" aria-hidden="true">
          <span className="av-cdiv__line"/>
          <span className="av-cdiv__icon">⚔</span>
          <span className="av-cdiv__line"/>
        </div>

        {/* Male hero — right */}
        <HeroCard
          hero={HEROES.male}
          selected={selected}
          hovered={hovered}
          heroName={maleName}
          petType={malePet}
          petOpen={petOpen}
          onSelect={handleSelect}
          onHoverIn={setHovered}
          onHoverOut={() => setHovered(null)}
          onNameChange={setMaleName}
          onPetToggle={handlePetToggle}
          onPetChoose={p => { setMalePet(p); setPetOpen(null); }}
          onPetClose={() => setPetOpen(null)}
        />
      </div>

      {/* ── FOOTER — selection hint + continue button ── */}
      <div className="avpage__footer">
        {!selected && (
          <p className="avpage__footer-hint">✦ Click a hero to begin your destiny ✦</p>
        )}
        {selected && !confirming && (
          <p className="avpage__footer-selected">
            ⚔ {heroDisplayName} — ready to enter the kingdom
          </p>
        )}
        <button
          id="continue-btn"
          className={[
            'av-continue-btn',
            selected   ? 'av-continue-btn--active'     : '',
            confirming ? 'av-continue-btn--confirming' : '',
          ].filter(Boolean).join(' ')}
          onClick={handleContinue}
          disabled={!selected}
          type="button"
        >
          <span className="av-continue-btn__shine" aria-hidden="true"/>
          <span className="av-continue-btn__text">
            {confirming
              ? '✦ Your legend begins…'
              : selected
                ? '⚔ Enter the Kingdom'
                : 'Choose a Hero First'}
          </span>
        </button>
      </div>

      {/* ── INVENTORY MODAL ── */}
      {invOpen && <InventoryPanel onClose={() => setInvOpen(false)}/>}
    </div>
  );
}