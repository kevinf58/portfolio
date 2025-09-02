import { useEffect, useState } from "react";

/**
 *
 * @returns the current scroll progress value of the current page
 */
export const useScrollProgress = (): number => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const top = window.scrollY;
      const pageHeight = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = (top / pageHeight) * 100;

      setScrollProgress(scrollProgress);
    };

    updateScrollProgress();

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return scrollProgress;
};
