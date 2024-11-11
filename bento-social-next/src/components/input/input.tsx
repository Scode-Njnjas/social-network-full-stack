import * as React from 'react';

import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'bg-transparent text-[0.875rem]/[1.25rem] font-rubik text-tertiary placeholder:text-tertiary opacity-50 focus:bg-transparent focus:opacity-100 focus:outline-none focus:ring-0 focus:outline-transparent',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export default Input;
