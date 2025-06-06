import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon, Bell, Menu as MenuIcon, X } from "lucide-react";
import { formatNumber } from "../../lib/utils";
import { Link } from "react-router-dom";
import Coin from "../../assets/coin.png";
import Logo from "../../assets/Logo.png";
import { useProfile } from "@/features";

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  isMobile: boolean;
}

export default function Navbar({
  toggleSidebar,
  isSidebarOpen,
  isMobile,
}: NavbarProps) {
  const { isDarkMode, toggleTheme } = useTheme();
  const { data: profile } = useProfile();

  return (
    <nav className="top-0 z-30 sticky bg-white dark:bg-gray-800 shadow-sm border-gray-200 dark:border-gray-700 border-b w-full">
      <div className="px-4 lg:px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {!isMobile && (
              <button
                onClick={toggleSidebar}
                className="lg:hidden text-gray-700 dark:text-gray-300"
              >
                {isSidebarOpen ? <X size={24} /> : <MenuIcon size={24} />}
              </button>
            )}

            {/* Logo - only show on mobile */}
            {isMobile && (
              <Link to="/" className="flex items-center space-x-2">
                <img src={Logo} alt="logo" />
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full text-gray-700 dark:text-gray-300"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button className="relative hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full text-gray-700 dark:text-gray-300">
              <Bell size={20} />
              <span className="block top-0 right-0 absolute bg-primary-600 rounded-full w-2 h-2"></span>
            </button>

            {/* BLOCK Balance */}
            <div className="hidden sm:flex items-center gap-2 bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-lg">
              <img src={Coin} alt="coin" className="w-4 h-4" />
              <span className="font-medium text-primary-700 dark:text-primary-300">
                {formatNumber(profile?.block_balance || 0)} BLOCKS
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
