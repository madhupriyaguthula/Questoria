import { useState } from "react";
import certificateBg from "../assets/certificate-bg.png";
import certPageBg from "../assets/cert-page-bg.jpg";
import charFemale from "../assets/char-female.png";
import charMale from "../assets/char-male.png";
import petWolf from "../assets/pet-wolf.png";
import petDragon from "../assets/pet-dragon.png";
import "./CertificateModal.css";

const PORTRAITS = {
  female: charFemale,
  male: charMale,
  "char-female.png": charFemale,
  "char-male.png": charMale,
};

const PETS = {
  female: petWolf,
  male: petDragon,
  "char-female.png": petWolf,
  "char-male.png": petDragon,
};

const HERO_TITLES = {
  female: "THE SEEKER",
  male: "THE WANDERER",
};

function CertificateModal({ onClose, pathName = "HTML & CSS WEB MASTERY", xp = 7350, coins = 450 }) {
  const username = localStorage.getItem("username") ? JSON.parse(localStorage.getItem("username")) : "Traveler";
  const avatarKey = localStorage.getItem("avatar") ? JSON.parse(localStorage.getItem("avatar")) : "female";
  
  const heroTitle = HERO_TITLES[avatarKey] || "HERO";
  const heroImg = PORTRAITS[avatarKey] || charFemale;
  const petImg = PETS[avatarKey] || petWolf;

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cert-modal-overlay" onClick={onClose} style={{ backgroundImage: `url(${certPageBg})` }}>
      
      {/* Translucent Dark Gold Overlay Backdrop */}
      <div className="cert-transparent-gold-bg" aria-hidden="true" />

      <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Top Controls */}
        <button className="cert-close-btn" onClick={onClose} title="Close Certificate">✕</button>

        {/* Print / Download Button */}
        <div className="cert-action-bar">
          <button className="cert-print-btn" onClick={handlePrint}>
            🖨️ PRINT / DOWNLOAD CERTIFICATE (PDF)
          </button>
        </div>

        {/* Royal Crown Astrolabe Scroll Certificate Frame */}
        <div className="cert-parchment-frame cert-pop-animation" id="printable-certificate" style={{ backgroundImage: `url(${certificateBg})` }}>
          
          {/* Subtle Diagonal Sheen Sweep Effect */}
          <div className="cert-shine-sweep" aria-hidden="true" />

          {/* Overlaid Typography & Matter */}
          <div className="cert-overlay-content">
            
            {/* Top Header Block */}
            <div className="cert-header-block">
              <h1 className="cert-main-gothic-title">Certificate of Mastery</h1>
              <p className="cert-royal-subtitle">✦ THE ROYAL ORDER OF QUESTORIA ✦</p>
            </div>

            {/* Recipient Proclamation */}
            <p className="cert-proclamation-text">THIS IS OFFICIALLY GRANTED TO</p>
            
            {/* Hero Title & Full Name */}
            <h2 className="cert-hero-fullname">
              <span className="cert-hero-title-prefix">{heroTitle}</span>
              <span className="cert-hero-divider"> — </span>
              <span className="cert-user-name">{username}</span>
            </h2>

            {/* Achievement Statement */}
            <p className="cert-conquest-statement">
              for demonstrating supreme courage, mastering ancient code runes, and conquering
            </p>

            {/* Path Title */}
            <h3 className="cert-achieved-path">{pathName.toUpperCase()}</h3>

            {/* Centered Hero & Pet Companion Duo (Matching Avatar Selection Screen) */}
            <div className="cert-duo-badge">
              <img src={heroImg} alt="Hero" className="cert-badge-hero" />
              {petImg && <img src={petImg} alt="Companion" className="cert-badge-pet" />}
              <div className="cert-duo-ground-glow"></div>
            </div>

            {/* Date & Stats Footer Alignment */}
            <div className="cert-stats-footer-row">
              <div className="cert-footer-meta left-meta">
                <span className="meta-label">DATE CONQUERED</span>
                <span className="meta-value">{today}</span>
              </div>

              <div className="cert-footer-meta center-meta">
                <span className="meta-label">TOTAL REWARDS</span>
                <span className="meta-value">⚡ {xp} XP &nbsp;•&nbsp; 🪙 {coins} COINS</span>
              </div>

              <div className="cert-footer-meta right-meta">
                <span className="meta-label">GRAND MASTER</span>
                <span className="meta-signature">Sage of Questoria</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default CertificateModal;
