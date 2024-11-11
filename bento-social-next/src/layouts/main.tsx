import { cn } from '@/lib';

// ---------------------------------------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Main = ({ children, className }: Props) => {
  return (
    <main
      className={cn(
        'flex-1 flex-grow w-full md:h-screen h-fit max-h-fit overflow-y-scroll no-scrollbar',
        className
      )}
    >
      {children}
      <div id="portal-root" />
    </main>
  );
};

export default Main;
