import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import DashboardLayout from "@/components/dashboard-layout";
import Clans from "@/pages/dashboard/clans";
import Leaderboard from "@/pages/dashboard/leaderboard";
import Missions from "@/pages/dashboard/missions";
import Profile from "@/pages/dashboard/profile";
import { StudioPage } from "@/pages/dashboard/studio";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="missions" />,
      },
      {
        path: "clans",
        element: <Clans />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "missions",
        element: <Missions />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "studio",
        element: <StudioPage />,
      },
    ],
  },
]);
