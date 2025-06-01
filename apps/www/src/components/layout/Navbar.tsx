import { useTheme } from "../../context/ThemeContext";
import {
  Sun,
  Moon,
  Bell,
  Menu as MenuIcon,
  X,
  Wallet,
} from "lucide-react";
import { formatNumber } from "../../lib/utils";
import { Link } from "react-router-dom";

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

  return (
    <nav className="sticky top-0 z-30 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!isMobile && (
              <button
                onClick={toggleSidebar}
                className="text-gray-700 dark:text-gray-300 lg:hidden"
              >
                {isSidebarOpen ? <X size={24} /> : <MenuIcon size={24} />}
              </button>
            )}

            {/* Logo - only show on mobile */}
            {isMobile && (
              <Link to="/" className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z" />
                  <path d="M16 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
                  <path d="M12 12a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
                  <path d="M8 16a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
                  <path d="M16 16a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
                  <path d="M8 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
                </svg>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Block Sensei
                </span>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 block w-2 h-2 rounded-full bg-primary-600"></span>
            </button>

            {/* BLOCK Balance */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <Wallet className="h-4 w-4 text-primary-500" />
              <span className="font-medium text-primary-700 dark:text-primary-300">
                {formatNumber(0)} BLOCKS
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
