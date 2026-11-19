import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 640;
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 0.02}px)`;

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const handleChange = (event: MediaQueryListEvent) =>
      setIsMobile(event.matches);

    setIsMobile(mql.matches);
    mql.addEventListener('change', handleChange);

    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return isMobile;
};
