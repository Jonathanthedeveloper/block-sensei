import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import DashboardLayout from "@/components/dashboard-layout";
import Clans from "@/pages/dashboard/clans";
import Leaderboard from "@/pages/dashboard/leaderboard";
import Missions from "@/pages/dashboard/missions";
import Profile from "@/pages/dashboard/profile";

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
        element: <Dashboard />,
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
    ],
  },
]);
