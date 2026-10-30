import React, { forwardRef } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      'inline-flex items-center justify-center font-sans font-semibold rounded-xl transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B111E] disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]';

    // Variant styles
    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'bg-gradient-to-r from-[#F0C961] via-[#D4AF37] to-[#B68C1F] text-[#0B111E] font-bold shadow-lg shadow-amber-500/20 hover:brightness-105 hover:shadow-amber-500/30 border border-amber-300/40',
      secondary:
        'bg-[#121927] text-stone-200 hover:text-white hover:bg-[#1A2337] border border-stone-700/80 hover:border-amber-400/50 shadow-md shadow-black/30',
      outline:
        'bg-transparent text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 border border-amber-500/40 hover:border-amber-400',
      ghost:
        'bg-transparent text-stone-300 hover:text-white hover:bg-white/5 border border-transparent',
      danger:
        'bg-red-950/40 text-red-300 hover:text-red-200 hover:bg-red-900/40 border border-red-800/40 hover:border-red-700',
    };

    // Size styles
    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg',
      md: 'h-10 px-3.5 sm:px-4 text-xs tracking-wider uppercase gap-2 rounded-xl',
      lg: 'min-h-[44px] px-4 sm:px-6 text-xs sm:text-sm tracking-wide gap-2 sm:gap-2.5 rounded-xl',
      xl: 'min-h-[48px] sm:h-14 px-4 sm:px-8 text-xs sm:text-base tracking-wide font-bold gap-2 sm:gap-3 rounded-xl sm:rounded-2xl',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Processing...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

