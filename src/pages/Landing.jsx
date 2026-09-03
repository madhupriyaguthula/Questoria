// src/pages/Landing.jsx
// ─────────────────────────────────────────────────────────
// QUESTORIA — Landing Page
// The first thing a user sees. Job: impress them and get
// them to click "Start Adventure".
// ─────────────────────────────────────────────────────────

// useEffect  → run code AFTER the component appears on screen
// useRef     → get a direct reference to a real DOM element
import { useEffect, useRef } from 'react';

// useNavigate → React Router hook to change the page URL programmatically
import { useNavigate } from 'react-router-dom';

// Styles scoped to this page only
import './Landing.css';

// Background image
import bgImage from '../assets/Backgrounds/fantasy-bg.png';

function Landing() {
  // heroRef points to the outer <div> of this page.
  // We use it to add a CSS class after mount, triggering the fade-in.
  const heroRef = useRef(null);

  // navigate() lets us send the user to a different route.
  const navigate = useNavigate();

  useEffect(() => {
    // Wait 100ms so the browser has painted the page before animating.
    // Without this delay, the animation sometimes doesn't trigger.
    const timer = setTimeout(() => {
      if (heroRef.current) {
        heroRef.current.classList.add('landing--visible');
      }
    }, 100);

    // Cleanup function: if the component unmounts before 100ms, cancel the timer.
    return () => clearTimeout(timer);
  }, []); // [] = run only once when the page first loads, never again

  // Called when the user clicks "Start Adventure"
  function handleStartAdventure() {
    navigate('/auth');
  }

  return (
    // The outer wrapper. Starts invisible (opacity: 0 in CSS).
    // useEffect adds 'landing--visible' → CSS transitions it to opacity: 1.
    <div className="landing" ref={heroRef}>

      {/* ── BACKGROUND ── */}
      {/*
        Two layers stacked using position: absolute.
        Layer 1: the image (or gradient fallback)
        Layer 2: dark overlay so text is always readable
      */}
      <div className="landing__bg" style={{ backgroundImage: `url(${bgImage})` }} aria-hidden="true">
        <div className="landing__bg-overlay" />
      </div>

      {/* ── FLOATING PARTICLES ── */}
      {/*
        12 tiny dots that float upward. Pure CSS animation.
        Each gets a CSS variable --i (its index) so the CSS can
        give each one a different position and animation delay.
      */}
      <div className="landing__particles" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="particle" style={{ '--i': i }} />
        ))}
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="landing__content">

        {/* Small label above the title */}
        <p className="landing__eyebrow">✦ An Epic Learning Adventure ✦</p>

        {/* Title with glow halo behind it */}
        <div className="landing__logo-wrap">
          <h1 className="landing__title">QUESTORIA</h1>
          {/* This div is the golden radial glow behind the letters */}
          <div className="landing__title-glow" aria-hidden="true" />
        </div>

        {/* Tagline — two lines */}
        <p className="landing__tagline">
          Learn Like a Hero.<br />
          Conquer Through Knowledge.
        </p>

        {/* Decorative gold line with diamond in the middle */}
        <div className="landing__divider" aria-hidden="true">
          <span className="landing__divider-line" />
          <span className="landing__divider-gem">◆</span>
          <span className="landing__divider-line landing__divider-line--right" />
        </div>

        {/* Quote */}
        <blockquote className="landing__quote">
          "Every Hero Starts With Knowledge."
        </blockquote>

        {/* Short description */}
        <p className="landing__desc">
          Embark on a legendary quest through seven magical worlds.
          Master knowledge, earn XP, unlock powerful armor, and rise
          from humble apprentice to legendary champion.
        </p>

        {/* ── CTA BUTTON ── */}
        {/*
          type="button" is important — prevents accidental form submission
          if this ever gets wrapped in a <form>.
        */}
        <button
          className="landing__cta"
          onClick={handleStartAdventure}
          type="button"
        >
          {/* The shine sweep — moves left to right on hover via CSS */}
          <span className="landing__cta-shine" aria-hidden="true" />
          <span className="landing__cta-text">⚔&nbsp; Start Adventure</span>
        </button>

        {/* Small helper text under the button */}
        <p className="landing__sub">
          Free to begin &nbsp;·&nbsp; Choose your hero &nbsp;·&nbsp; Claim your glory
        </p>

        {/* ── FEATURE HINTS ── */}
        {/* Three quick icons hinting at game features */}
        <div className="landing__hints">
          <div className="landing__hint">
            <span className="landing__hint-icon">🗺️</span>
            <span>7 Worlds</span>
          </div>
          <div className="landing__hint">
            <span className="landing__hint-icon">⚡</span>
            <span>XP & Levels</span>
          </div>
          <div className="landing__hint">
            <span className="landing__hint-icon">🏆</span>
            <span>Certificate</span>
          </div>
        </div>

      </main>

      {/* ── SCROLL HINT ── */}
      <div className="landing__scroll-hint" aria-hidden="true">
        <span className="landing__scroll-label">scroll</span>
        <div className="landing__scroll-line" />
      </div>

    </div>
  );
}

export default Landing;