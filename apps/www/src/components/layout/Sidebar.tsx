import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  LayoutDashboard,
  Trophy,
  Shapes,
  Users,
  Award,
  ArrowRight,
  Edit3,
} from "lucide-react";
import { motion } from "framer-motion";
import Logo from "../../assets/logo.png";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMobile: boolean;
}

export default function Sidebar({ isOpen, setIsOpen, isMobile }: SidebarProps) {
  const location = useLocation();

  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 35 },
    },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 35 },
    },
  };

  const linkItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Missions",
      href: "/missions",
      icon: Trophy,
    },
    {
      name: "Clans",
      href: "/clans",
      icon: Shapes,
    },
    {
      name: "Leaderboard",
      href: "/leaderboard",
      icon: Award,
    },
    {
      name: "Studio",
      href: "/studio",
      icon: Edit3,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: Users,
    },
  ];

  const closeSidebarIfMobile = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  if (!isOpen && !isMobile) {
    return (
      <div className='hidden top-0 left-0 fixed lg:flex flex-col items-center bg-white dark:bg-gray-800 py-8 border-gray-200 dark:border-gray-700 border-r w-16 h-screen'>
        <div className='mb-8'>
          <Link to='/' className='flex justify-center items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-8 h-8 text-primary-600'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z' />
              <path d='M16 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z' />
              <path d='M12 12a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z' />
              <path d='M8 16a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z' />
              <path d='M16 16a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z' />
              <path d='M8 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z' />
            </svg>
          </Link>
        </div>
        <div className='flex flex-col items-center gap-4'>
          {linkItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "p-3 rounded-xl transition-colors",
                  isActive
                    ? "bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                )}
                onClick={closeSidebarIfMobile}
              >
                <Icon size={20} />
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div
          className='lg:hidden z-40 fixed inset-0 bg-black/50'
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.aside
        initial={isMobile ? "closed" : "open"}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col z-50 transition-transform",
          isMobile ? "lg:hidden" : "hidden lg:flex"
        )}
      >
        <div className='p-6'>
          <Link
            to='/'
            className='flex items-center space-x-2'
            onClick={closeSidebarIfMobile}
          >
            <img src={Logo} alt='logo' />
          </Link>
        </div>

        <div className='flex-1 px-4 py-6 overflow-auto'>
          <nav className='space-y-1'>
            {linkItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                  )}
                  onClick={closeSidebarIfMobile}
                >
                  <Icon size={20} className='flex-shrink-0 mr-3' />
                  <span>{item.name}</span>
                  {isActive && <ArrowRight className='ml-auto w-4 h-4' />}
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.aside>
    </>
  );
}
