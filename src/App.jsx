import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import VillagePage from "./pages/VillagePage";
import PathSelectPage from "./pages/PathSelectPage";
import WorldMap from "./pages/WorldMap";
import QuestPage from "./pages/QuestPage";
import QuizPage from "./pages/QuizPage";
import BossBattlePage from "./pages/BossBattlePage";
import RewardScreen from "./pages/RewardScreen";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";

// Helper: localStorage నుండి safe ga load చేయడానికి
function loadState(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [selectedPath, setSelectedPath] = useState(() => loadState("selectedPath", null));
  const [hasSelectedPath, setHasSelectedPath] = useState(() => loadState("hasSelectedPath", false));
  const [username, setUsername] = useState(() => loadState("username", "Traveler"));
  const [avatar, setAvatar] = useState(() => loadState("avatar", "avatar-hero.png"));

  // Load path-specific states dynamically based on the current active course
  const [completedWorlds, setCompletedWorlds] = useState(() => {
    const initialPath = loadState("selectedPath", null);
    return initialPath ? loadState(`completedWorlds_${initialPath}`, []) : [];
  });
  const [totalXP, setTotalXP] = useState(() => {
    const initialPath = loadState("selectedPath", null);
    return initialPath ? loadState(`totalXP_${initialPath}`, 0) : 0;
  });
  const [totalCoins, setTotalCoins] = useState(() => {
    const initialPath = loadState("selectedPath", null);
    return initialPath ? loadState(`totalCoins_${initialPath}`, 0) : 0;
  });
  const [hasCertificate, setHasCertificate] = useState(() => {
    const initialPath = loadState("selectedPath", null);
    return initialPath ? loadState(`hasCertificate_${initialPath}`, false) : false;
  });
  const [inventory, setInventory] = useState(() => {
    const initialPath = loadState("selectedPath", null);
    return initialPath ? loadState(`inventory_${initialPath}`, []) : [];
  });

  // Sync state modifications automatically to course-specific localStorage keys
  useEffect(() => { localStorage.setItem("selectedPath", JSON.stringify(selectedPath)); }, [selectedPath]);
  useEffect(() => { localStorage.setItem("hasSelectedPath", JSON.stringify(hasSelectedPath)); }, [hasSelectedPath]);
  useEffect(() => { localStorage.setItem("username", JSON.stringify(username)); }, [username]);
  useEffect(() => { localStorage.setItem("avatar", JSON.stringify(avatar)); }, [avatar]);
  
  useEffect(() => {
    if (selectedPath) {
      localStorage.setItem(`completedWorlds_${selectedPath}`, JSON.stringify(completedWorlds));
    }
  }, [completedWorlds, selectedPath]);

  useEffect(() => {
    if (selectedPath) {
      localStorage.setItem(`totalXP_${selectedPath}`, JSON.stringify(totalXP));
    }
  }, [totalXP, selectedPath]);

  useEffect(() => {
    if (selectedPath) {
      localStorage.setItem(`totalCoins_${selectedPath}`, JSON.stringify(totalCoins));
    }
  }, [totalCoins, selectedPath]);

  useEffect(() => {
    if (selectedPath) {
      localStorage.setItem(`hasCertificate_${selectedPath}`, JSON.stringify(hasCertificate));
    }
  }, [hasCertificate, selectedPath]);

  useEffect(() => {
    if (selectedPath) {
      localStorage.setItem(`inventory_${selectedPath}`, JSON.stringify(inventory));
    }
  }, [inventory, selectedPath]);

  // Load correct state when active course path changes
  useEffect(() => {
    if (selectedPath) {
      setCompletedWorlds(loadState(`completedWorlds_${selectedPath}`, []));
      setTotalXP(loadState(`totalXP_${selectedPath}`, 0));
      setTotalCoins(loadState(`totalCoins_${selectedPath}`, 0));
      setHasCertificate(loadState(`hasCertificate_${selectedPath}`, false));
      setInventory(loadState(`inventory_${selectedPath}`, []));
    }
  }, [selectedPath]);

  const resetCourseProgress = () => {
    if (selectedPath) {
      setCompletedWorlds([]);
      setTotalXP(0);
      setTotalCoins(0);
      setHasCertificate(false);
      setInventory([]);

      localStorage.removeItem(`completedWorlds_${selectedPath}`);
      localStorage.removeItem(`totalXP_${selectedPath}`);
      localStorage.removeItem(`totalCoins_${selectedPath}`);
      localStorage.removeItem(`hasCertificate_${selectedPath}`);
      localStorage.removeItem(`inventory_${selectedPath}`);

      // Clear world chapter subtopic checks for this course path
      const pathWorlds = worlds.filter(w => w.pathId === selectedPath);
      pathWorlds.forEach(w => {
        localStorage.removeItem(`world-${w.id}-completed`);
      });

      window.location.reload();
    }
  };

  const handleSelectPath = (pathId) => {
    setSelectedPath(pathId);
    setHasSelectedPath(true);
  };

  const markWorldComplete = (worldId) => {
    setCompletedWorlds((prev) => (prev.includes(worldId) ? prev : [...prev, worldId]));
  };

  const addRewards = (xp, coins) => {
    setTotalXP((prev) => prev + xp);
    setTotalCoins((prev) => prev + coins);
  };

  const addToInventory = (item) => {
    if (item) setInventory((prev) => [...prev, item]);
  };

  const heroTitle = totalXP >= 2000 ? "Hero" : null;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={hasSelectedPath ? <Navigate to="/worldmap" /> : <VillagePage />}
        />
        <Route path="/path-select" element={<PathSelectPage onSelectPath={handleSelectPath} />} />
        <Route path="/village" element={<VillagePage />} />
        <Route
          path="/worldmap"
          element={
            <WorldMap
              completedWorlds={completedWorlds}
              selectedPath={selectedPath}
              totalXP={totalXP}
              totalCoins={totalCoins}
              heroTitle={heroTitle}
              inventory={inventory}
              resetCourseProgress={resetCourseProgress}
              avatar={avatar}
            />
          }
        />
        <Route path="/quest/:worldId" element={<QuestPage />} />
        <Route path="/quiz/:worldId" element={<QuizPage />} />
        <Route path="/boss/:worldId" element={<BossBattlePage />} />
        <Route
          path="/reward/:worldId"
          element={
            <RewardScreen
              markWorldComplete={markWorldComplete}
              addRewards={addRewards}
              setHasCertificate={setHasCertificate}
              addToInventory={addToInventory}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProfilePage
              username={username}
              setUsername={setUsername}
              avatar={avatar}
              setAvatar={setAvatar}
              totalXP={totalXP}
              totalCoins={totalCoins}
              heroTitle={heroTitle}
              inventory={inventory}
              completedWorlds={completedWorlds}
              selectedPath={selectedPath}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;