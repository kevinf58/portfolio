import { Breakpoints } from '@/types/Breakpoints';
import { useEffect, useState } from 'react';

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<keyof Breakpoints>('2xl');

  useEffect(() => {
    const handleBreakpoint = () => {
      const width = window.innerWidth;

      const updatedBreakpoint: keyof Breakpoints =
        width <= 640 ? 'sm' : width <= 768 ? 'md' : width <= 1024 ? 'lg' : width <= 1280 ? 'xl' : '2xl';
      setBreakpoint(updatedBreakpoint);
    };

    handleBreakpoint();
    window.addEventListener('resize', handleBreakpoint);

    return () => {
      window.removeEventListener('resize', handleBreakpoint);
    };
  }, []);

  return breakpoint;
};
