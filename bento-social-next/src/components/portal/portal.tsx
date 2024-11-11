import React from 'react';
import { createPortal } from 'react-dom';

//-------------------------------------------------------------------------

interface PortalProps {
  children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    children,
    document.getElementById('portal-root') as HTMLElement // Gắn vào phần tử với id="portal-root"
  );
};

export default Portal;
