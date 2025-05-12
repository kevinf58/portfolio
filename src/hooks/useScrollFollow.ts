import { useEffect, useState } from 'react';

// this hook utilizes an element's ref to translate the element "offset" tailwind units upwards
// when the user scrolls down and returns the state of whether or not the user has scrolled from the
// top of the screen
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
