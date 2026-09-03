// src/pages/Auth.jsx
// QUESTORIA — Login / Sign Up Page

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Auth.css';

import authBg from '../assets/auth-bg.png';

// ── Render API Base URL Configuration ────────────────────
const API_BASE_URL = "https://questoria-1.onrender.com";

// ── Inline SVG icons ─────────────────────────────────────
const IcoUser = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
const IcoAt   = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/></svg>);
const IcoMail = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>);
const IcoPhone= () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);
const IcoLock = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>);
const IcoEye  = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>);
const IcoEyeOff=()=> (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>);

const IcoGoogle = () => (<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>);
const IcoDiscord=()=>(<svg viewBox="0 0 24 24" width="18" height="18" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.045.03.06a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>);
const IcoGithub=()=> (<svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>);

// ── Reusable field row ────────────────────────────────────
function Field({ icon, name, type, placeholder, value, onChange, autoComplete, right }) {
  return (
    <div className="auth-field">
      <span className="auth-field__icon">{icon}</span>
      <input
        name={name} type={type} className="auth-input"
        placeholder={placeholder} value={value}
        onChange={onChange} autoComplete={autoComplete}
      />
      {right && <span className="auth-field__right">{right}</span>}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────
function Auth({ startMode, setUsername }) {
  const navigate = useNavigate();
  const location = useLocation();

  const initMode = () => {
    if (startMode) return startMode;
    if (location.pathname === '/login') return 'login';
    return 'signup';
  };

  const [mode,     setMode]     = useState(initMode);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState('');
  const [showPw,  setShowPw]  = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [agreed,  setAgreed]  = useState(false);
  

  const [form, setForm] = useState({
    name:'', username:'', email:'', phone:'', password:'', confirmPassword:'',
  });

  useEffect(() => {
    if (location.pathname === '/login')  setMode('login');
    if (location.pathname === '/signup') setMode('signup');
  }, [location.pathname]);

  function change(e) {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
  }

  function switchMode(next) {
    setMode(next);
    setError(''); setSuccess('');
    setAgreed(false); setShowPw(false); setShowCpw(false);
    setForm({ name:'', username:'', email:'', phone:'', password:'', confirmPassword:'' });
    navigate('/' + next, { replace: true });
  }

  async function submit(e) {
    e.preventDefault();
    setError(''); setSuccess('');

    if (mode === 'signup') {
      if (!form.name.trim())                  { setError('Enter your full name.');          return; }
      if (!form.username.trim())              { setError('Choose a hero username.');        return; }
      if (!form.email.trim() || !form.email.includes('@')) { setError('Enter a valid email.');       return; }
      if (!form.phone.trim())                 { setError('Enter your phone number.');       return; }
      if (form.password.length < 6)           { setError('Password needs at least 6 chars.');return; }
      if (form.password !== form.confirmPassword)     { setError('Passwords do not match.');         return; }
      if (!agreed)                            { setError('Agree to Terms & Conditions.');    return; }
    } else {
      if (!form.username.trim()) { setError('Enter your username.'); return; }
      if (!form.password.trim()) { setError('Enter your password.'); return; }
    }

    setLoading(true);

    try {
      // Direct call to Render Backend API
      const endpoint = mode === 'signup' ? '/api/auth/register' : '/api/auth/login';
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed on server.');
      }

      // Save user details
      const userPayload = {
        name: data.user?.name || form.name || form.username,
        username: data.user?.username || form.username,
        email: data.user?.email || form.email,
        token: data.token || null,
        isAuthenticated: true
      };
      localStorage.setItem('questoria_user', JSON.stringify(userPayload));

      if (setUsername) {
        setUsername(userPayload.username);
      }

      setLoading(false);

      if (mode === 'signup') {
        setSuccess('Legend created! Entering the kingdom…');
        setTimeout(() => navigate('/avatar-selection'), 1600);
      } else {
        setSuccess('Welcome back, hero! Entering the kingdom…');
        setTimeout(() => navigate('/avatar-selection'), 1400);
      }

    } catch (err) {
      setLoading(false);
      // Fallback mechanism if backend fails / sleep mode
      setError(err.message || 'Server connection error. Please try again.');
    }
  }

  const isLogin = mode === 'login';

  return (
    <div className="auth-page">
      {/* Full-bleed background */}
      <div className="auth-bg" style={{ backgroundImage: `url(${authBg})` }}/>
      {/* Dark vignette overlay matching reference */}
      <div className="auth-vignette"/>

      {/* Top-left brand mark */}
      <button className="auth-corner-logo" onClick={() => navigate('/')} type="button">
        <span className="auth-corner-crown">♛</span>
        <span className="auth-corner-name">QUESTORIA</span>
      </button>

      {/* ── CARD ── */}
      <div className="auth-card">

        {/* Top ornate border */}
        <div className="auth-rule"><span/><em>✦</em><span/></div>

        {/* Header */}
        <div className="auth-card__head">
          <span className="auth-card__crown">♛</span>
          <h1 className="auth-card__brand">QUESTORIA</h1>
          <p className="auth-card__sub">{isLogin ? 'WELCOME BACK, HERO!' : 'CREATE YOUR LEGEND'}</p>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={submit} noValidate>

          {!isLogin && <>
            <Field icon={<IcoUser/>}  name="name"            type="text"                         placeholder="Enter your name"     value={form.name}            onChange={change} autoComplete="name"/>
            <Field icon={<IcoAt/>}    name="username"        type="text"                         placeholder="Choose a username"   value={form.username}        onChange={change} autoComplete="username"/>
            <Field icon={<IcoMail/>}  name="email"           type="email"                        placeholder="Enter your email"    value={form.email}           onChange={change} autoComplete="email"/>
            <Field icon={<IcoPhone/>} name="phone"           type="tel"                          placeholder="Enter phone number"  value={form.phone}           onChange={change} autoComplete="tel"/>
            <Field icon={<IcoLock/>}  name="password"        type={showPw  ? 'text':'password'}  placeholder="Create a password"   value={form.password}        onChange={change} autoComplete="new-password"
              right={<button type="button" className="auth-eye" onClick={()=>setShowPw(p=>!p)}>{showPw?<IcoEyeOff/>:<IcoEye/>}</button>}/>
            <Field icon={<IcoLock/>}  name="confirmPassword" type={showCpw ? 'text':'password'}  placeholder="Confirm your password" value={form.confirmPassword} onChange={change} autoComplete="new-password"
              right={<button type="button" className="auth-eye" onClick={()=>setShowCpw(p=>!p)}>{showCpw?<IcoEyeOff/>:<IcoEye/>}</button>}/>
            <label className="auth-terms">
              <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)}/>
              <span>I agree to the <button type="button" className="auth-link">Terms &amp; Conditions</button></span>
            </label>
          </>}

          {isLogin && <>
            <Field icon={<IcoAt/>}   name="username" type="text"                        placeholder="Enter your username" value={form.username} onChange={change} autoComplete="username"/>
            <Field icon={<IcoLock/>} name="password" type={showPw ? 'text':'password'}  placeholder="Enter your password" value={form.password} onChange={change} autoComplete="current-password"
              right={<button type="button" className="auth-eye" onClick={()=>setShowPw(p=>!p)}>{showPw?<IcoEyeOff/>:<IcoEye/>}</button>}/>
            <div className="auth-row">
              <label className="auth-remember"><input type="checkbox"/><span>Remember me</span></label>
              <button type="button" className="auth-link">Forgot Password?</button>
            </div>
          </>}

          {error   && <p className="auth-msg auth-msg--err" role="alert">⚠ {error}</p>}
          {success && <p className="auth-msg auth-msg--ok"  role="status">✓ {success}</p>}

          <button type="submit" className={`auth-submit${loading?' auth-submit--busy':''}`} disabled={loading}>
            <span className="auth-submit__shine" aria-hidden="true"/>
            <span className="auth-submit__label">
              {loading ? 'Opening the Gates…' : isLogin ? 'LOGIN' : 'SIGN UP'}
            </span>
          </button>
        </form>

        {/* Social */}
        <div className="auth-or"><span/><span className="auth-or__txt">OR CONTINUE WITH</span><span/></div>
        <div className="auth-socials">
          <button type="button" className="auth-social" aria-label="Google"><IcoGoogle/></button>
          <button type="button" className="auth-social" aria-label="Discord"><IcoDiscord/></button>
          <button type="button" className="auth-social" aria-label="GitHub"><IcoGithub/></button>
        </div>

        {/* Switch */}
        <p className="auth-switch">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button type="button" className="auth-link" onClick={()=>switchMode(isLogin?'signup':'login')}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>

        {/* Bottom ornate border */}
        <div className="auth-rule"><span/><em>✦</em><span/></div>
      </div>
    </div>
  );
}

export default Auth;