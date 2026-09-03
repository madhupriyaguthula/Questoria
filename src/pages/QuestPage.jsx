import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { worlds } from "../data/questData";
import DialogueBox from "../components/DialogueBox";
import questDetailsBg from "../assets/quest-details-bg.png";
import dialogueBg from "../assets/dialogue-bg.jpeg";
import "./QuestPage.css";

// SVG Icons for RPG UI
const EmblemIcon = () => (
  <svg viewBox="0 0 100 100" className="header-emblem-icon">
    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3,3" />
    <path d="M 50,4 L 50,14 M 50,96 L 50,86 M 4,50 L 14,50 M 96,50 L 86,50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 18,18 L 26,26 M 82,18 L 74,26 M 18,82 L 26,74 M 82,82 L 74,74" stroke="currentColor" strokeWidth="1" />
    <polygon points="50,12 54,42 88,50 54,58 50,88 46,58 12,50 46,42" fill="currentColor" opacity="0.1" />
    <polygon points="50,16 53,44 84,50 53,56 50,84 47,56 16,50 47,44" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <polygon points="50,28 52,48 72,50 52,52 50,72 48,52 28,50 48,48" fill="none" stroke="currentColor" strokeWidth="1" />
    <circle cx="50" cy="50" r="6" fill="#120d0a" stroke="currentColor" strokeWidth="2" />
    <polygon points="50,47 52,50 50,53 48,50" fill="currentColor" />
  </svg>
);

const BackArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const HourglassIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 2h14"></path>
    <path d="M5 22h14"></path>
    <path d="M19 2v4c0 4-4 6-4 6s4 2 4 6v4"></path>
    <path d="M5 2v4c0 4 4 6 4 6s-4 2-4 6v4"></path>
    <path d="M12 12v4"></path>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const ChestIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M2 13h20"></path>
    <path d="M6 7V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v4"></path>
    <circle cx="12" cy="13" r="2" fill="currentColor"></circle>
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const ScrollIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const QuillIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
);

const GoldCoinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="7" fill="none" stroke="#2a1a0f" strokeWidth="1.5" />
  </svg>
);

const XPGemIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <polygon points="12,2 21,8 17,21 7,21 3,8" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

function QuestPage() {
  const { worldId } = useParams();
  const navigate = useNavigate();
  const world = worlds.find((w) => w.id === parseInt(worldId));
  const [stage, setStage] = useState("details");
  
  // Load total stats from localStorage
  const userTotalXP = localStorage.getItem("totalXP") ? JSON.parse(localStorage.getItem("totalXP")) : 0;
  const userTotalCoins = localStorage.getItem("totalCoins") ? JSON.parse(localStorage.getItem("totalCoins")) : 0;

  const renderHUD = () => (
    <div className="player-hud-widget">
      <div className="hud-stat-item xp">
        <span className="hud-icon">💎</span>
        <span className="hud-val">{userTotalXP} XP</span>
      </div>
      <div className="hud-stat-item coins">
        <span className="hud-icon">🪙</span>
        <span className="hud-val">{userTotalCoins} Coins</span>
      </div>
    </div>
  );
  
  // Learning states
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const [completedTopics, setCompletedTopics] = useState(() => {
    if (!world) return [];
    const saved = localStorage.getItem(`world-${world.id}-completed`);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [openSubtopic, setOpenSubtopic] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    if (world) {
      localStorage.setItem(`world-${world.id}-completed`, JSON.stringify(completedTopics));
    }
  }, [completedTopics, world]);

  if (!world) return <p className="quest-error-text">World not found.</p>;

  // Organize flat topics into distinct modules dynamically
  const modulesMap = {};
  if (world.learningContent) {
    world.learningContent.forEach((topic, index) => {
      const modName = topic.module || "Core Module";
      if (!modulesMap[modName]) {
        modulesMap[modName] = [];
      }
      modulesMap[modName].push({ ...topic, globalIndex: index });
    });
  }

  const modulesKeys = Object.keys(modulesMap);

  // Initialize expanded modules on mount
  useEffect(() => {
    if (modulesKeys.length > 0) {
      const initial = {};
      modulesKeys.forEach((key, idx) => {
        initial[key] = idx === 0; // expand first module by default
      });
      setExpandedModules(initial);
    }
  }, [worldId]);

  const toggleModule = (moduleKey) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleKey]: !prev[moduleKey]
    }));
  };

  const currentTopic = world.learningContent ? world.learningContent[selectedTopicIndex] : null;

  const handleNextLearning = () => {
    if (!currentTopic) return;
    setOpenSubtopic(null);
    const currentId = currentTopic.id;
    
    // Add current topic to completed list if not already there
    if (!completedTopics.includes(currentId)) {
      setCompletedTopics((prev) => [...prev, currentId]);
    }

    if (selectedTopicIndex < world.learningContent.length - 1) {
      setSelectedTopicIndex(selectedTopicIndex + 1);
    }
  };

  const isTopicUnlocked = (index) => {
    if (index === 0) return true;
    if (!world.learningContent) return false;
    const prevTopic = world.learningContent[index - 1];
    return completedTopics.includes(prevTopic.id);
  };

  const allCompleted = world.learningContent ? world.learningContent.every((topic) => completedTopics.includes(topic.id)) : true;

  // Helper to split title into sub-header and main-title
  const displayTitle = (title) => {
    if (title && title.includes(":")) {
      const parts = title.split(":");
      return {
        sub: parts[0].trim(),
        main: parts[1].trim()
      };
    }
    return {
      sub: `WORLD ${world.id}`,
      main: title || ""
    };
  };

  const titleInfo = displayTitle(world.title);

  const getObjectiveIcon = (index) => {
    switch (index) {
      case 0:
        return <CodeIcon />;
      case 1:
        return <ScrollIcon />;
      case 2:
        return <QuillIcon />;
      default:
        return <ShieldIcon />;
    }
  };

  const getObjectiveXP = (index) => {
    const totalXP = world.rewards.xpPerCorrect * world.quiz.length;
    const objCount = world.questBrief?.objectives?.length || 1;
    if (objCount === 3 && totalXP === 10) return index === 2 ? 4 : 3;
    if (objCount === 3 && totalXP === 500) return index === 0 ? 200 : 150;
    return Math.round(totalXP / objCount);
  };

  const totalXP = world.rewards?.xp !== undefined ? world.rewards.xp : ((world.rewards?.xpPerCorrect || 0) * (world.quiz?.length || 0));
  const totalCoins = world.rewards?.coins !== undefined ? world.rewards.coins : ((world.rewards?.coinsPerCorrect || 0) * (world.quiz?.length || 0));

  // Mini-Project Card
  if (world.isMiniProject) {
    return (
      <div className="quest-details-fullpage" style={{ backgroundImage: `url(${questDetailsBg})` }}>
        {renderHUD()}
        <div className="quest-container-layout">
          <div className="quest-details-box quest-left-box">
            <div className="header-emblem-container">
              <EmblemIcon />
            </div>
            <button className="back-btn" onClick={() => navigate("/worldmap")}>
              <BackArrowIcon /> BACK
            </button>
            
            <p className="quest-world-label">{titleInfo.sub}</p>
            <h2 className="quest-title">{titleInfo.main}</h2>
            <span className="quest-tag-badge tag mini-project-tag">
              <ShieldIcon /> Mini Project
            </span>

            <div className="project-brief-container">
              <div className="objectives-header-container">
                <div className="header-wing"></div>
                <h4 className="objectives-title">PROJECT BRIEF</h4>
                <div className="header-wing"></div>
              </div>
              <div className="project-brief-content">
                <p>{world.projectBrief}</p>
              </div>
            </div>
          </div>

          <div className="quest-details-box quest-right-box">
            <div className="header-emblem-container">
              <EmblemIcon />
            </div>
            <h4 className="card-title">PROJECT STATUS</h4>

            <div className="meta-vertical-stack">
              <div className="meta-card-item">
                <div className="meta-icon"><HourglassIcon /></div>
                <div className="meta-info">
                  <span className="meta-label">EST. TIME</span>
                  <span className="meta-value">{world.questBrief?.estTime || "2 hours"}</span>
                </div>
              </div>

              <div className="meta-card-item">
                <div className="meta-icon"><ShieldIcon /></div>
                <div className="meta-info">
                  <span className="meta-label">DIFFICULTY</span>
                  <span className="meta-value">{world.questBrief?.difficulty || "Medium"}</span>
                </div>
              </div>

              <div className="meta-card-item">
                <div className="meta-icon"><ChestIcon /></div>
                <div className="meta-info">
                  <span className="meta-label">REWARDS SUMMARY</span>
                  <span className="meta-value">{totalXP} XP + {totalCoins} Coins</span>
                </div>
              </div>
            </div>

            <button className="start-quest-btn" onClick={() => navigate(`/reward/${world.id}`)}>
              <span className="btn-icon"><ShieldIcon /></span>
              SUBMIT PROJECT
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Boss Battle Card
  if (world.isBossWorld) {
    return (
      <div className="quest-details-fullpage" style={{ backgroundImage: `url(${questDetailsBg})` }}>
        {renderHUD()}
        <div className="quest-container-layout">
          <div className="quest-details-box quest-left-box">
            <div className="header-emblem-container">
              <EmblemIcon />
            </div>
            <button className="back-btn" onClick={() => navigate("/worldmap")}>
              <BackArrowIcon /> BACK
            </button>
            
            <p className="quest-world-label">{titleInfo.sub}</p>
            <h2 className="quest-title">{titleInfo.main}</h2>
            <span className="quest-tag-badge tag boss-tag">
              <ShieldIcon /> Final Boss
            </span>

            <div className="boss-brief-container">
              <div className="objectives-header-container">
                <div className="header-wing"></div>
                <h4 className="objectives-title">BOSS ENCOUNTER</h4>
                <div className="header-wing"></div>
              </div>
              <p className="boss-dialogue-text">
                {world.storyDialogue[0]?.text || "Prepare yourselves, heroes. Prove your absolute mastery to conquer this world."}
              </p>
            </div>
          </div>

          <div className="quest-details-box quest-right-box">
            <div className="header-emblem-container">
              <EmblemIcon />
            </div>
            <h4 className="card-title">BOSS STATUS</h4>

            <div className="meta-vertical-stack">
              <div className="meta-card-item">
                <div className="meta-icon"><HourglassIcon /></div>
                <div className="meta-info">
                  <span className="meta-label">EST. TIME</span>
                  <span className="meta-value">{world.questBrief?.estTime || "45 min"}</span>
                </div>
              </div>

              <div className="meta-card-item">
                <div className="meta-icon"><ShieldIcon /></div>
                <div className="meta-info">
                  <span className="meta-label">DIFFICULTY</span>
                  <span className="meta-value">{world.questBrief?.difficulty || "Hard"}</span>
                </div>
              </div>

              <div className="meta-card-item">
                <div className="meta-icon"><ChestIcon /></div>
                <div className="meta-info">
                  <span className="meta-label">REWARDS SUMMARY</span>
                  <span className="meta-value">{totalXP} XP + {totalCoins} Coins</span>
                </div>
              </div>
            </div>

            <button className="start-quest-btn" onClick={() => navigate(`/boss/${world.id}`)}>
              <span className="btn-icon"><ShieldIcon /></span>
              ENTER BOSS BATTLE
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Details Card
  if (stage === "details") {
    return (
      <div className="quest-details-fullpage" style={{ backgroundImage: `url(${questDetailsBg})` }}>
        {renderHUD()}
        <div className="quest-container-layout">
          <div className="quest-details-box quest-left-box">
            <div className="header-emblem-container">
              <EmblemIcon />
            </div>
            <button className="back-btn" onClick={() => navigate("/worldmap")}>
              <BackArrowIcon /> BACK
            </button>
            
            <p className="quest-world-label">{titleInfo.sub}</p>
            <h2 className="quest-title">{titleInfo.main}</h2>
            <span className="quest-tag-badge">
              <ShieldIcon /> Main Quest
            </span>
            
            <p className="quest-description">
              Ancient forces stir in the forgotten lands. Prove your knowledge and begin your legend.
            </p>

            <div className="quest-content-grid">
              <div className="objectives-column">
                <div className="objectives-header-container">
                  <div className="header-wing"></div>
                  <h4 className="objectives-title">OBJECTIVES</h4>
                  <div className="header-wing"></div>
                </div>
                
                <div className="objectives-list-container">
                  {world.questBrief?.objectives.map((obj, i) => (
                    <div className="objective-item" key={i}>
                      <div className="objective-icon-container">
                        {getObjectiveIcon(i)}
                      </div>
                      <span className="objective-text">{obj}</span>
                      <span className="objective-reward">+{getObjectiveXP(i)} XP</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rewards-resources-column">
                <div className="rewards-card">
                  <h4 className="card-title">REWARDS</h4>
                  
                  <div className="reward-list-item">
                    <div className="reward-icon-badge xp-badge"><XPGemIcon /></div>
                    <span className="reward-value">{totalXP} XP</span>
                  </div>

                  <div className="reward-list-item">
                    <div className="reward-icon-badge coin-badge"><GoldCoinIcon /></div>
                    <span className="reward-value">{totalCoins} Coins</span>
                  </div>

                  <div className="reward-list-item">
                    <div className="reward-icon-badge chest-badge"><ChestIcon /></div>
                    <span className="reward-value">Rare Chest</span>
                  </div>
                </div>

                <div className="resource-card">
                  <h4 className="card-title">RESOURCE</h4>
                  <div className="resource-detail-box">
                    <p className="resource-name">{world.questBrief?.resourceLabel || "HTML References"}</p>
                  </div>
                  <a
                    href={world.questBrief?.resourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="open-resource-btn"
                  >
                    OPEN RESOURCE
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="quest-details-box quest-right-box">
            <div className="header-emblem-container">
              <EmblemIcon />
            </div>
            
            <h4 className="card-title">QUEST ACTION</h4>

            <div className="meta-vertical-stack">
              <div className="meta-card-item">
                <div className="meta-icon"><HourglassIcon /></div>
                <div className="meta-info">
                  <span className="meta-label">EST. TIME</span>
                  <span className="meta-value">{world.questBrief?.estTime || "30 min"}</span>
                </div>
              </div>

              <div className="meta-card-item">
                <div className="meta-icon"><ShieldIcon /></div>
                <div className="meta-info">
                  <span className="meta-label">DIFFICULTY</span>
                  <span className="meta-value">{world.questBrief?.difficulty || "Easy"}</span>
                </div>
              </div>

              <div className="meta-card-item">
                <div className="meta-icon"><ChestIcon /></div>
                <div className="meta-info">
                  <span className="meta-label">REWARDS SUMMARY</span>
                  <span className="meta-value">{totalXP} XP + {totalCoins} Coins</span>
                </div>
              </div>
            </div>

            <button className="start-quest-btn" onClick={() => setStage("dialogue")}>
              <span className="btn-icon"><ShieldIcon /></span>
              START QUEST
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dialogue Card
  if (stage === "dialogue") {
    return (
      <div 
        className="quest-page dialogue-stage"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          minHeight: "100vh",
          maxWidth: "none",
          margin: 0,
          padding: 0,
          backgroundImage: `url(${dialogueBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 999,
          overflow: "hidden"
        }}
      >
        {renderHUD()}
        <button className="back-btn" onClick={() => navigate("/worldmap")} style={{ position: "absolute", top: "16px", left: "16px", zIndex: 10 }}>
          <BackArrowIcon /> BACK
        </button>
        <DialogueBox
          dialogue={world.storyDialogue}
          onComplete={() => setStage("learning")}
          buttonLabel="Start Learning"
        />
      </div>
    );
  }

  // High-Fidelity Side-by-Side Course Learning Stage
  return (
    <div className="quest-page course-learning-stage">
      {renderHUD()}
      <button className="back-btn" onClick={() => navigate("/worldmap")}>
        <BackArrowIcon /> BACK
      </button>

      <div className="course-layout-container">
        
        {/* LEFT SIDEBAR: Quest Chapters & Accordion Modules */}
        <div className="course-sidebar">
          <h4 className="sidebar-header-title">QUEST CHAPTERS</h4>
          
          <div className="modules-accordion-list">
            {modulesKeys.map((moduleKey) => {
              const isExpanded = expandedModules[moduleKey];
              const moduleTopicsList = modulesMap[moduleKey];
              
              return (
                <div className={`module-accordion-card ${isExpanded ? "active" : ""}`} key={moduleKey}>
                  <button 
                    className="module-accordion-header"
                    onClick={() => toggleModule(moduleKey)}
                  >
                    <span className="module-title-text">{moduleKey}</span>
                    <span className="accordion-arrow">{isExpanded ? "▼" : "▶"}</span>
                  </button>
                  
                  {isExpanded && (
                    <div className="module-accordion-content">
                      {moduleTopicsList.map((topic) => {
                        const isUnlocked = isTopicUnlocked(topic.globalIndex);
                        const isCompleted = completedTopics.includes(topic.id);
                        const isActive = selectedTopicIndex === topic.globalIndex;
                        
                        return (
                          <button
                            key={topic.id}
                            disabled={!isUnlocked}
                            className={`topic-sidebar-link ${isActive ? "active" : ""} ${!isUnlocked ? "locked" : ""}`}
                            onClick={() => {
                              setSelectedTopicIndex(topic.globalIndex);
                              setOpenSubtopic(null);
                            }}
                          >
                            <span className={`status-checkbox-icon ${isCompleted ? "checked" : ""}`}>
                              {isCompleted ? <CheckIcon /> : ""}
                            </span>
                            <span className="topic-title-label">{topic.title}</span>
                            {!isUnlocked && (
                              <span className="locked-icon-badge">
                                <LockIcon />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Locked/Unlocked Start Quiz Trigger */}
          <button 
            className={`start-quiz-sidebar-btn ${allCompleted ? "unlocked" : "locked"}`}
            disabled={!allCompleted}
            onClick={() => navigate(`/quiz/${world.id}`)}
          >
            {!allCompleted && <LockIcon />}
            <span>{allCompleted ? "START FINAL CHALLENGE" : "FINAL CHALLENGE LOCKED"}</span>
          </button>
        </div>

        {/* RIGHT AREA: Main Content Details Screen */}
        <div className="course-main-content">
          <div className="content-sheet-header">
            <span className="content-module-label">{currentTopic.module}</span>
            <h3 className="content-topic-title">{currentTopic.title}</h3>
            
            <div className="course-progress-header">
              <span className="progress-percentage-label">
                Progress: {Math.round((completedTopics.length / world.learningContent.length) * 100)}%
              </span>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill"
                  style={{ width: `${(completedTopics.length / world.learningContent.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="content-sheet-body">
            <p className="topic-main-description">{currentTopic.content}</p>

            {currentTopic.code && (
              <div className="code-example-panel">
                <span className="code-panel-title">CODE EXAMPLE</span>
                <pre className="code-display-block">
                  <code>{currentTopic.code}</code>
                </pre>
              </div>
            )}

            {currentTopic.subtopics && currentTopic.subtopics.length > 0 && (
              <div className="subtopics-accordion-list">
                <span className="subtopics-header-title">UNDERSTAND THE DETAIL</span>
                {currentTopic.subtopics.map((sub, i) => {
                  const isOpen = openSubtopic === i;
                  return (
                    <div className={`subtopic-card ${isOpen ? "open" : ""}`} key={i}>
                      <button 
                        className="subtopic-toggle-btn"
                        onClick={() => setOpenSubtopic(isOpen ? null : i)}
                      >
                        <span className="subtopic-heading-text">{sub.heading}</span>
                        <span className="subtopic-status-label">{isOpen ? "Hide Detail" : "Reveal Detail"}</span>
                      </button>
                      {isOpen && (
                        <div className="subtopic-body-content">
                          <p>{sub.content}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="content-sheet-footer">
            <button 
              className="complete-lesson-action-btn"
              onClick={handleNextLearning}
            >
              {selectedTopicIndex === world.learningContent.length - 1 
                ? "Mark All Completed" 
                : "Complete Topic & Next"
              }
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default QuestPage;