import { useState, useEffect } from 'react';

function useScreenSize() {
  const [isScreenBreakpoint, setIsScreenBreakpoint] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsScreenBreakpoint(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return isScreenBreakpoint;
}

export default useScreenSize;
