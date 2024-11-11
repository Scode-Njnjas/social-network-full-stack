import React, {
  createContext,
  HTMLAttributes,
  useContext,
  useState,
} from 'react';

import { Typography } from '@/components/typography';

import { cn } from '@/lib';

//-----------------------------------------------------------------------------------------------

export enum ThemeOption {
  light,
  dark,
  auto,
}

interface ThemeSelectContextProps {
  activeTheme: ThemeOption;
  setActiveTheme: (theme: ThemeOption) => void;
}

const ThemeSelectContext = createContext<ThemeSelectContextProps | undefined>(
  undefined
);

const useThemeSelectContext = () => {
  const context = useContext(ThemeSelectContext);
  if (!context) {
    throw new Error(
      'useThemeSelectContext must be used within a ThemeSelectGroup'
    );
  }

  return context;
};

type ThemeSelectGroupProps = HTMLAttributes<HTMLDivElement>;

const ThemeSelectGroup = ({
  children,
  className,
  ...props
}: ThemeSelectGroupProps) => {
  const [activeTheme, setActiveTheme] = useState<ThemeOption>(
    ThemeOption.light
  );
  return (
    <ThemeSelectContext.Provider value={{ activeTheme, setActiveTheme }}>
      <div {...props} className={cn('flex gap-5', className)}>
        {children}
      </div>
    </ThemeSelectContext.Provider>
  );
};

interface GroupItemProps extends HTMLAttributes<HTMLButtonElement> {
  leading: React.ReactNode;
  title: string;
  value: ThemeOption;
}

const GroupItem = ({ leading, title, value }: GroupItemProps) => {
  const { activeTheme, setActiveTheme } = useThemeSelectContext();

  const handleSetActiveTheme = () => {
    setActiveTheme(value);
  };
  const isActive = activeTheme === value;
  return (
    <button
      onClick={handleSetActiveTheme}
      className={`group/item flex flex-col gap-3 items-center cursor-pointer ${isActive && 'active'}`}
    >
      <div
        className={`h-[76px] w-[102px] rounded-xl border p-[2px] border-transparent group-[.active]/item:border-neutral2-80 flex flex-shrink-0 flex-col items-center justify-center`}
      >
        {leading}
      </div>
      <Typography
        level="captionsm"
        className="text-secondary opacity-80 capitalize group-[.active]/item:text-primary group-hover/item:opacity-100"
      >
        {title}
      </Typography>
    </button>
  );
};

ThemeSelectGroup.item = GroupItem;

export default ThemeSelectGroup;
