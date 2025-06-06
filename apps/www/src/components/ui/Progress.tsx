import * as RadixProgress from '@radix-ui/react-progress';
import { cn } from '../../lib/utils';
import { useState, useEffect } from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'success';
  showValue?: boolean;
  className?: string;
  animate?: boolean;
}

export default function Progress({
  value,
  max = 100,
  size = 'md',
  variant = 'primary',
  showValue = false,
  className,
  animate = true,
}: ProgressProps) {
  const [progress, setProgress] = useState(0);
  const percentage = Math.min(100, Math.round((value / max) * 100));

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setProgress(percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setProgress(percentage);
    }
  }, [percentage, animate]);

  const variants = {
    default: 'bg-gray-600',
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    accent: 'bg-accent-500',
    success: 'bg-success-600',
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full', className)}>
      <RadixProgress.Root
        className={cn(
          'relative overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700',
          sizes[size]
        )}
        value={progress}
        max={100}
      >
        <RadixProgress.Indicator
          className={cn(
            'w-full h-full transition-transform duration-500 ease-in-out',
            variants[variant]
          )}
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </RadixProgress.Root>
      {showValue && (
        <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
          {percentage}%
        </div>
      )}
    </div>
  );
}