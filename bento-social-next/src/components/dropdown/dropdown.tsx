import { cn } from '@/lib/utils';
import React from 'react';

type DropdownOption = {
  label: string;
  value: string;
  color?: string;
  [key: string]: string | undefined;
};

type DropdownProps = {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = 'Select option',
  className,
  disabled,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
  };

  const renderOptionContent = (option: DropdownOption) => (
    <div className="flex items-center gap-2">
      {option.color && (
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: option.color }}
        />
      )}
      <span>{option.label}</span>
    </div>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'w-fit p-2.5 inline-flex gap-3 items-center rounded-[0.75rem] group bg-neutral2-1 ml-4',
          'after:content-[""] after:w-2 after:h-2',
          'after:border-r-2 after:border-b-2 after:border-secondary',
          'after:transform after:rotate-45 after:transition-transform after:duration-200',
          disabled && 'opacity-50 cursor-not-allowed',
          isOpen && 'after:rotate-[225deg] after:translate-y-1',

          className
        )}
      >
        <div className="text-sm text-gray-200">
          {selectedOption ? renderOptionContent(selectedOption) : placeholder}
        </div>
      </button>

      {isOpen && (
        <div
          className="absolute z-50 w-fit mt-2 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative backdrop-blur-[50px] rounded-lg">
            <div className="max-h-60 overflow-auto">
              {options.map((option, index) => (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={option.value === value}
                  className={cn(
                    'relative px-4 py-2 text-sm cursor-pointer',
                    'bg-neutral2-1 hover:bg-neutral2-10 hover:text-primary text-primary',
                    index === 0 && 'rounded-t-lg',
                    index === options.length - 1 && 'rounded-b-lg',
                    option.value === value && 'bg-neutral2-10 text-primary'
                  )}
                  onClick={() => handleOptionClick(option.value)}
                >
                  {renderOptionContent(option)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
