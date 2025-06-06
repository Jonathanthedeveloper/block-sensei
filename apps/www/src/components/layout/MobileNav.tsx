import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import Quest from "../../assets/quest.png";
import Mission from "../../assets/mission.png";

import Team from "../../assets/team.png";
import Profile from "../../assets/profile.png";

export default function MobileNav() {
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/dashboard", icon: Mission },
    { name: "Missions", href: "/missions", icon: Quest },
    { name: "Clans", href: "/clans", icon: Team },
    { name: "Profile", href: "/profile", icon: Profile },
  ];

  return (
    <motion.nav
      className='right-0 bottom-0 left-0 z-50 fixed bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 border-t'
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      <div className='flex justify-around items-center h-16'>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.name}
              to={item.href}
              className='relative flex flex-col justify-center items-center w-full h-full'
            >
              <div
                className={cn(
                  "flex flex-col items-center justify-center min-w-[64px] min-h-[44px] rounded-lg transition-colors",
                  isActive
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-gray-500 dark:text-gray-400"
                )}
              >
                <img src={Icon} alt='icon' className='w-4 h-4' />
                <span className='mt-1 text-xs'>{item.name}</span>

                {isActive && (
                  <motion.div
                    layoutId='activeTab'
                    className='-top-1 left-1/2 absolute bg-primary-600 dark:bg-primary-400 rounded-full w-1 h-1'
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    style={{ x: "-50%" }}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
