import * as RadixAvatar from '@radix-ui/react-avatar';
import { cn } from '../../lib/utils';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallbackClassName?: string;
}

export default function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  className,
  fallbackClassName,
}: AvatarProps) {
  const sizes = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
  };

  return (
    <RadixAvatar.Root
      className={cn(
        'relative inline-flex rounded-full overflow-hidden',
        sizes[size],
        className
      )}
    >
      <RadixAvatar.Image
        className="w-full h-full object-cover"
        src={src}
        alt={alt}
      />
      <RadixAvatar.Fallback
        className={cn(
          'w-full h-full flex items-center justify-center bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 font-medium',
          fallbackClassName
        )}
        delayMs={600}
      >
        {fallback?.slice(0, 2).toUpperCase() || '??'}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
}