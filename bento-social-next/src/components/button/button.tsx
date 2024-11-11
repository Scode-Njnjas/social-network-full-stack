import { cn } from '@/lib/utils';
import { forwardRef, HTMLAttributes } from 'react';
//--------------------------------------------------------------------------

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  child: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: 'submit' | 'button';
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  child,
  disabled,
  type,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      disabled={disabled}
      type={type}
      className={cn(
        'relative inline-flex justify-center items-center rounded-button shadow-button bg-[#282828b3] backdrop-blur-[50px] before:content-[""] before:absolute before:inset-0 before:rounded-button before:pointer-events-none before:border-[1.5px] before:border-[#ffffff1a] before:[mask-image:linear-gradient(175deg,#000,transparent_50%)] hover:bg-neutral2-10 hover:text-primary',
        className
      )}
    >
      {child}
    </button>
  )
});

Button.displayName = 'Button'

export default Button;
