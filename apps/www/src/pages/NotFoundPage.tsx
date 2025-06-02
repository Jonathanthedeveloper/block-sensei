import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-primary-500 mb-6 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/>
          <path d="M16 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"/>
          <path d="M12 12a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"/>
          <path d="M8 16a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"/>
          <path d="M16 16a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"/>
          <path d="M8 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"/>
        </svg>
        
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Page Not Found</p>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The quest you're looking for may have been completed or doesn't exist yet.
        </p>
        
        <Link to="/">
          <Button variant="primary" size="lg" icon={<Home size={18} />}>
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}