import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { worlds } from "../data/questData";
import questDetailsBg from "../assets/quest-details-bg.png";
import avatarHero from "../assets/avatar-hero.png"; // Imports player portrait
import "./QuizPage.css"; // Imports the high-fidelity quiz styling

function QuizPage() {
  const { worldId } = useParams();
  const navigate = useNavigate();
  const world = worlds.find((w) => w.id === parseInt(worldId));
  
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null); // null | "pass" | "fail"
  
  // MCQ state
  const [selected, setSelected] = useState(null);
  
  // Matching question state
  const [matchingAnswers, setMatchingAnswers] = useState(["", "", "", ""]);
  
  // Coding question state
  const [codeInput, setCodeInput] = useState("");
  const [codeFeedback, setCodeFeedback] = useState(null); // null | { success: boolean, message: string }
  const [isValidCode, setIsValidCode] = useState(false);

  if (!world) return <p className="quest-error-text">World not found.</p>;

  const question = world.quiz[current];
  const PASS_PERCENT = 70; // 70% of 15 questions is 11 correct answers

  const handleNext = () => {
    let isCorrect = false;

    if (question.type === "mcq" || question.type === "truefalse") {
      isCorrect = selected === question.correctAnswer;
    } else if (question.type === "matching") {
      isCorrect = question.pairs.every((pair, idx) => matchingAnswers[idx] === pair.right);
    } else if (question.type === "code") {
      isCorrect = isValidCode;
    }

    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);

    if (current < world.quiz.length - 1) {
      setCurrent(current + 1);
      // Reset question states
      setSelected(null);
      setMatchingAnswers(["", "", "", ""]);
      setCodeInput("");
      setCodeFeedback(null);
      setIsValidCode(false);
    } else {
      const percent = (newScore / world.quiz.length) * 100;
      if (percent >= PASS_PERCENT) {
        setResult("pass");
      } else {
        setResult("fail");
      }
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setMatchingAnswers(["", "", "", ""]);
    setCodeInput("");
    setCodeFeedback(null);
    setIsValidCode(false);
    setResult(null);
  };

  const handleContinueToReward = () => {
    const { learningXP, learningCoins, xpPerCorrect, coinsPerCorrect, bonus } = world.rewards;
    const isPerfect = score === world.quiz.length;

    const quizXP = score * xpPerCorrect;
    const quizCoins = score * coinsPerCorrect;
    const bonusXP = isPerfect ? bonus.xp : 0;
    const bonusCoins = isPerfect ? bonus.coins : 0;

    navigate(`/reward/${world.id}`, {
      state: {
        score,
        total: world.quiz.length,
        totalXP: learningXP + quizXP + bonusXP,
        totalCoins: learningCoins + quizCoins + bonusCoins,
        isPerfect,
      },
    });
  };

  // Safe client-side sandbox validation evaluation
  const handleVerifyCode = () => {
    const code = codeInput.trim();
    if (!code) {
      setCodeFeedback({ success: false, message: "Please write some code first." });
      setIsValidCode(false);
      return;
    }

    try {
      const checkFn = new Function("input", `return (${question.validationCode});`);
      const isValid = checkFn(code);

      if (isValid) {
        setCodeFeedback({ success: true, message: "Code verified successfully! Proceed to next." });
        setIsValidCode(true);
      } else {
        setCodeFeedback({ success: false, message: "Code verification failed. Check tag structure or content." });
        setIsValidCode(false);
      }
    } catch (err) {
      setCodeFeedback({ success: false, message: "Syntax error detected in code input." });
      setIsValidCode(false);
    }
  };

  // Load total stats from localStorage
  const totalXP = localStorage.getItem("totalXP") ? JSON.parse(localStorage.getItem("totalXP")) : 0;
  const totalCoins = localStorage.getItem("totalCoins") ? JSON.parse(localStorage.getItem("totalCoins")) : 0;

  const renderHUD = () => (
    <div className="player-hud-widget">
      <div className="hud-stat-item xp">
        <span className="hud-icon">💎</span>
        <span className="hud-val">{totalXP} XP</span>
      </div>
      <div className="hud-stat-item coins">
        <span className="hud-icon">🪙</span>
        <span className="hud-val">{totalCoins} Coins</span>
      </div>
    </div>
  );

  const renderCharacterArena = () => (
    <div className="quiz-character-arena">
      <img src={avatarHero} alt="Your hero" className="quiz-hero-sprite" />
      <div className="quiz-pedestal"></div>
    </div>
  );

  if (result === "fail") {
    return (
      <div className="quiz-container-fullpage" style={{ backgroundImage: `url(${questDetailsBg})` }}>
        {renderHUD()}
        {renderCharacterArena()}
        <div className="quiz-content-box quiz-passed-modal">
          <h2 className="quiz-result-title">Challenge Failed</h2>
          <p className="quiz-result-score">You scored {score}/{world.quiz.length}</p>
          <p className="quiz-result-percent">
            Percentage: {Math.round((score / world.quiz.length) * 100)}% (Required: {PASS_PERCENT}%)
          </p>
          <button className="quiz-action-btn" onClick={handleRetry}>Retry Challenge</button>
        </div>
      </div>
    );
  }

  if (result === "pass") {
    return (
      <div className="quiz-container-fullpage" style={{ backgroundImage: `url(${questDetailsBg})` }}>
        {renderHUD()}
        {renderCharacterArena()}
        
        {/* Render falling paper flakes */}
        {Array.from({ length: 60 }).map((_, i) => {
          const colors = ["#ffd700", "#ff4757", "#2ed573", "#5f27cd", "#00bfff", "#ff6b81"];
          return (
            <div 
              key={i}
              className="confetti-paper-flake"
              style={{
                left: `${Math.random() * 98 + 1}%`,
                animationDelay: `${Math.random() * 3.5}s`,
                animationDuration: `${Math.random() * 2 + 2.5}s`,
                backgroundColor: colors[Math.floor(Math.random() * colors.length)]
              }}
            />
          );
        })}

        <div className="quiz-content-box quiz-passed-modal">
          <h2 className="quiz-result-title">Challenge Passed! 🎉</h2>
          <p className="quiz-result-score">You scored {score}/{world.quiz.length}</p>
          <p className="quiz-result-percent">
            Percentage: {Math.round((score / world.quiz.length) * 100)}% - Masterfully done!
          </p>
          <button className="quiz-action-btn" onClick={handleContinueToReward}>Claim Quest Rewards</button>
        </div>
      </div>
    );
  }

  // Generate randomized right options alphabetically to shuffle choices cleanly
  const matchingRightChoices = question.type === "matching"
    ? [...question.pairs].map(p => p.right).sort()
    : [];

  const handleMatchingChange = (idx, value) => {
    setMatchingAnswers((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  };

  const isNextDisabled = () => {
    if (question.type === "mcq" || question.type === "truefalse") {
      return !selected;
    }
    if (question.type === "matching") {
      return matchingAnswers.some(ans => ans === "");
    }
    if (question.type === "code") {
      return !isValidCode;
    }
    return true;
  };

  return (
    <div className="quiz-container-fullpage" style={{ backgroundImage: `url(${questDetailsBg})` }}>
      {renderHUD()}
      {renderCharacterArena()}
      <div className="quiz-content-box">
        <span className="quiz-header-tag">Question {current + 1}/{world.quiz.length}</span>
        
        <h2 className="quiz-title">{world.title}</h2>
        <p className="quiz-question-text">{question.question}</p>

        {/* 1. RENDER MCQ OR TRUE/FALSE */}
        {(question.type === "mcq" || question.type === "truefalse") && (
          <div className="quiz-options-list">
            {question.options.map((opt, i) => {
              const alphabet = ["A", "B", "C", "D"];
              return (
                <button
                  key={opt}
                  className={`quiz-option-btn ${selected === opt ? "selected" : ""}`}
                  onClick={() => setSelected(opt)}
                >
                  <span className="quiz-option-index">
                    <span className="quiz-option-index-text">{alphabet[i]}</span>
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* 2. RENDER MATCHING QUESTION */}
        {question.type === "matching" && (
          <div className="quiz-matching-container">
            {question.pairs.map((pair, idx) => (
              <div className="matching-pair-row" key={idx}>
                <span className="matching-left-term">{pair.left}</span>
                <select
                  className="matching-select-dropdown"
                  value={matchingAnswers[idx]}
                  onChange={(e) => handleMatchingChange(idx, e.target.value)}
                >
                  <option value="">Select Match...</option>
                  {matchingRightChoices.map((choice) => (
                    <option key={choice} value={choice}>{choice}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        {/* 3. RENDER CODING CHALLENGE */}
        {question.type === "code" && (
          <div className="quiz-coding-container">
            <div className="coding-terminal-header">
              <span className="terminal-title">CODE COMPILER TERMINAL</span>
              <div className="terminal-buttons">
                <span className="terminal-dot dot-red"></span>
                <span className="terminal-dot dot-yellow"></span>
                <span className="terminal-dot dot-green"></span>
              </div>
            </div>
            
            <textarea
              className="coding-textarea-editor"
              value={codeInput}
              onChange={(e) => {
                setCodeInput(e.target.value);
                setIsValidCode(false);
                setCodeFeedback(null);
              }}
              placeholder="// Write your HTML/JS code here..."
            />

            <div className="code-verification-bar">
              <button className="verify-btn" onClick={handleVerifyCode}>Verify Code</button>
              {codeFeedback && (
                <span className={`code-status-message ${codeFeedback.success ? "status-success" : "status-error"}`}>
                  {codeFeedback.message}
                </span>
              )}
            </div>
            
            {question.hint && <p className="code-hint-text">Hint: {question.hint}</p>}
          </div>
        )}

        <button 
          className="quiz-action-btn" 
          disabled={isNextDisabled()} 
          onClick={handleNext}
        >
          {current === world.quiz.length - 1 ? "Finish Quest" : "Next Question"}
        </button>
      </div>
    </div>
  );
}

export default QuizPage;