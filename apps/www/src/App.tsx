import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import MissionsPage from "./pages/MissionsPage";
import ClanPage from "./pages/ClanPage";
import ClansPage from "./pages/ClansPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage";
import QuestPage from "./pages/QuestPage";
import RoundPage from "./pages/RoundPage";
import StudioPage from "./pages/StudioPage";
import CreateClanPage from "./pages/CreateClanPage";
import CreateMissionPage from "./pages/CreateMissionPage";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* Protected routes */}
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="missions" element={<MissionsPage />} />
        <Route path="missions/:missionId" element={<QuestPage />} />
        <Route
          path="missions/:missionId/rounds/:roundId"
          element={<RoundPage />}
        />
        <Route path="clans" element={<ClansPage />} />
        <Route path="clans/:clanId" element={<ClanPage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="studio" element={<StudioPage />} />
        <Route path="studio/create-clan" element={<CreateClanPage />} />
        <Route
          path="studio/mission/:clanId/:missionId?"
          element={<CreateMissionPage />}
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
