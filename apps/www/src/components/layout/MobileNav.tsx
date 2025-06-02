import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Trophy, Users, Award, User } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function MobileNav() {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Missions', href: '/missions', icon: Trophy },
    { name: 'Clans', href: '/clans', icon: Users },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className="relative flex flex-col items-center justify-center w-full h-full"
            >
              <div
                className={cn(
                  "flex flex-col items-center justify-center min-w-[64px] min-h-[44px] rounded-lg transition-colors",
                  isActive 
                    ? "text-primary-600 dark:text-primary-400" 
                    : "text-gray-500 dark:text-gray-400"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs mt-1">{item.name}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 left-1/2 w-1 h-1 rounded-full bg-primary-600 dark:bg-primary-400"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    style={{ x: '-50%' }}
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