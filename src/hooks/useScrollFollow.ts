import { useEffect, useState } from 'react';

/**
 *
 * @param ref the ref of the component that this hook is attached to
 * @param offset the amount the component should move upwards on scroll in tailwind units
 * @returns the boolean for whether or not the user has scrolled
 */
export function useScrollFollow(ref: React.RefObject<HTMLElement | null>, offset: number): boolean {
  const [isScrolled, setIsScrolled] = useState(false);
  const tailwindUnits = offset * 0.25;

  useEffect(() => {
    
    const transform = () => {
      const y = Math.max(tailwindUnits - window.scrollY / 16, 0);
      if (ref.current) {
        ref.current.style.transform = `translateY(-${tailwindUnits - y}rem)`;
      }

      setIsScrolled(y <= 0);
    };

    transform();

    window.addEventListener('scroll', transform);

    return () => window.removeEventListener('scroll', transform);
  }, [ref, tailwindUnits]);

  return isScrolled;
}
