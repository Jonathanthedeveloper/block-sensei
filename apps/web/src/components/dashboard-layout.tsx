import { Outlet, NavLink } from "react-router-dom";
import { Home, Target, Users, Trophy, User } from "lucide-react";
import Logo from "./logo";
import coinSrc from "@/assets/coin.png";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Lessons", href: "/dashboard/missions", icon: Target },
  { name: "Clans", href: "/dashboard/clans", icon: Users },
  { name: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r border-[#A4A4A466] bg-[#020202] hidden md:block">
        <div className="p-4 h-16">
          <Logo />
        </div>
        <ul className="text-white font-semibold p-4">
          {navigation.map((item) => (
            <li key={item.name} className="block">
              <NavLink
                end
                to={item.href}
                className="w-full px-3 py-4 hover:bg-[#4DA2FF66] rounded-sm [&.active]:bg-[#4DA2FF66] [&.active]:text-[#4DA2FF] flex items-center gap-2"
              >
                <div className="w-6">
                  <item.icon size={20} />
                </div>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex-grow flex flex-col">
        <Header />
        <div className="flex-grow max-h-full overflow-y-scroll bg-[#020202] text-white p-8">
          <Outlet />
        </div>
        <Navbar />
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="bg-[#020202] md:hidden">
      <ul className="text-white font-semibold flex justify-between p-2 gap-2">
        {navigation.map((item) => (
          <li key={item.name} className="block flex-grow">
            <NavLink
              end
              to={item.href}
              className="hover:bg-[#4DA2FF66] [&.active]:bg-[#4DA2FF66] [&.active]:text-[#4DA2FF] flex flex-col items-center justify-center p-2 rounded-lg"
            >
              <div className="w-6">
                <item.icon size={20} />
              </div>
              <span className="text-xs sm:text-sm">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Header() {
  return (
    <header className="border border-b border-[#A4A4A466] flex justify-between items-center md:justify-end bg-[#020202] px-4 py-2">
      <div className="h-8 md:hidden">
        <Logo />
      </div>
      <div className="flex items-center px-3.5 py-2 gap-2 text-white border border-[#A4A4A466] rounded-full h-10">
        <img src={coinSrc} />
        <span className="text-xs">Blocks:</span>
        <span className="text-sm font-bold">0</span>
      </div>
    </header>
  );
}
