import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/helpers';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'success' | 'error' | 'warning';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  icon,
  className,
  ...props
}: ButtonProps) => {
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500',
    outline: 'bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
    success: 'bg-success-500 hover:bg-success-700 text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-success-500',
    error: 'bg-error-500 hover:bg-error-700 text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-error-500',
    warning: 'bg-warning-500 hover:bg-warning-700 text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-warning-500',
  };

  const sizeClasses = {
    sm: 'text-sm px-4 py-2 rounded-md',
    md: 'text-base px-6 py-3 rounded-lg',
    lg: 'text-lg px-8 py-4 rounded-lg',
  };

  return (
    <button
      className={cn(
        'font-medium transition-all duration-200 relative inline-flex items-center justify-center',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        isLoading ? 'opacity-80 cursor-not-allowed' : '',
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white animate-spin"
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
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      )}
      <span className={cn(
        'flex items-center',
        isLoading ? 'invisible' : '',
        icon ? 'space-x-2' : ''
      )}>
        {icon && <span>{icon}</span>}
        <span>{children}</span>
      </span>
    </button>
  );
};

export default Button;