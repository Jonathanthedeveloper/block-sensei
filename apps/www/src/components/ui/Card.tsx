import { cn } from '../../lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'elevated';
  hoverEffect?: boolean;
}

export function Card({ className, children, variant = 'default', hoverEffect = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl bg-white dark:bg-gray-800 overflow-hidden',
        variant === 'bordered' && 'border border-gray-200 dark:border-gray-700',
        variant === 'elevated' && 'shadow-md',
        hoverEffect && 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function CardHeader({ className, children }: CardHeaderProps) {
  return (
    <div
      className={cn(
        'p-6 border-b border-gray-100 dark:border-gray-700',
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function CardTitle({ className, children }: CardTitleProps) {
  return (
    <h3
      className={cn(
        'text-xl font-bold text-gray-900 dark:text-white',
        className
      )}
    >
      {children}
    </h3>
  );
}

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export function CardContent({ className, children }: CardContentProps) {
  return (
    <div
      className={cn(
        'p-6',
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export function CardFooter({ className, children }: CardFooterProps) {
  return (
    <div
      className={cn(
        'p-6 border-t border-gray-100 dark:border-gray-700',
        className
      )}
    >
      {children}
    </div>
  );
}