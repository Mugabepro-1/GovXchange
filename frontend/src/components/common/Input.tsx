import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../../utils/helpers';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = true, className, ...props }, ref) => {
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label
            htmlFor={props.id}
            className="form-label"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'form-input',
            error ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : '',
            fullWidth ? 'w-full' : '',
            className
          )}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-error-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;