import { motion } from 'framer-motion';
import { XCircle, CheckCircle, AlertCircle, InfoIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const iconMap = {
  success: <CheckCircle className="h-5 w-5 text-success-500" />,
  error: <XCircle className="h-5 w-5 text-error-500" />,
  warning: <AlertCircle className="h-5 w-5 text-warning-500" />,
  info: <InfoIcon className="h-5 w-5 text-primary-500" />
};

const backgroundMap = {
  success: 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800',
  error: 'bg-error-50 dark:bg-error-900/20 border-error-200 dark:border-error-800',
  warning: 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800',
  info: 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800'
};

export default function Toast({ message, type, onClose }: ToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={cn(
        'w-72 sm:w-96 rounded-lg border shadow-md p-4 flex items-start gap-3',
        backgroundMap[type]
      )}
    >
      <div className="shrink-0 mt-0.5">{iconMap[type]}</div>
      <div className="flex-1 text-gray-700 dark:text-gray-200 text-sm">{message}</div>
      <button 
        onClick={onClose}
        className="shrink-0 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
      >
        <XCircle className="h-5 w-5" />
      </button>
    </motion.div>
  );
}