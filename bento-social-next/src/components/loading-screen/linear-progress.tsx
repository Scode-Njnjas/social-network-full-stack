import { CSSProperties } from 'react';

import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------

type IStyle = CSSProperties;

interface LinearProgressProps {
  color?: string;
  sx?: IStyle;
}

export default function LinearProgress({ color, sx }: LinearProgressProps) {
  const { width, maxWidth } = { ...sx };

  return (
    <div
      className={cn(
        'bg-[#a7caed] h-[4px] overflow-hidden relative z-0 rounded-full',
        width === 1 ? 'w-full' : `w-[${width}px]`,
        maxWidth ? `max-w-[${maxWidth}px]` : ''
      )}
    >
      <span
        className={`absolute left-0 top-0 bottom-0 transition-transform origin-left bg-${color} w-auto animate-linear-indeterminate1`}
      ></span>
      <span
        className={`absolute left-0 top-0 bottom-0 transition-transform duration-200 ease-linear origin-left bg-${color} w-auto animate-linear-indeterminate2`}
      ></span>
    </div>
  );
}
