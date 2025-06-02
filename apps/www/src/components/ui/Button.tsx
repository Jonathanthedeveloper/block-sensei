import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { LoaderCircleIcon } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-elevation-2 hover:shadow-elevation-3 hover:-translate-y-0.5 active:translate-y-0 active:shadow-elevation-1',
      secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white shadow-elevation-2 hover:shadow-elevation-3 hover:-translate-y-0.5 active:translate-y-0 active:shadow-elevation-1',
      accent: 'bg-accent-500 hover:bg-accent-600 text-white shadow-elevation-2 hover:shadow-elevation-3 hover:-translate-y-0.5 active:translate-y-0 active:shadow-elevation-1',
      outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 shadow-elevation-1 hover:shadow-elevation-2 hover:-translate-y-0.5 active:translate-y-0',
      ghost: 'bg-transparent hover:bg-gray-100 text-gray-800 dark:hover:bg-gray-800 dark:text-gray-200 hover:-translate-y-0.5 active:translate-y-0',
      link: 'bg-transparent text-primary-600 hover:underline p-0 hover:-translate-y-0.5 active:translate-y-0',
    };

    const sizes = {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "rounded-lg font-medium transition-all duration-200 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
          variants[variant],
          sizes[size],
          fullWidth ? "w-full" : "",
          disabled
            ? "opacity-60 cursor-not-allowed transform-none shadow-none"
            : "",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 animate-spin">
            <LoaderCircleIcon />
          </span>
        ) : icon && iconPosition === "left" ? (
          <span className="mr-2">{icon}</span>
        ) : null}

        {children}

        {!isLoading && icon && iconPosition === "right" && (
          <span className="ml-2">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;