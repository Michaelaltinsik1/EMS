import { useEffect, useState } from 'react';

const TABLETBREAKPOINT = 769;
const TABLETEDGECASESBREAKPOINT = 1000;
const DESKTOPBREAKPOINT = 1201;
const DESKTOPEDGECASESBREAKPOINT = 1800;
const XLDESKTOPBREAKPOINT = 2560;
export const useBreakpoint = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  // Return the width so we can use it in our components
  return {
    isMobile: width < TABLETBREAKPOINT,
    isTablet: width < DESKTOPBREAKPOINT && width >= TABLETBREAKPOINT,
    isTabletEdgeCase:
      width < DESKTOPBREAKPOINT && width >= TABLETEDGECASESBREAKPOINT,
    isDesktop: width >= DESKTOPBREAKPOINT && width < XLDESKTOPBREAKPOINT,
    isDesktopEdgeCaseBreakpoint:
      width < XLDESKTOPBREAKPOINT && width >= DESKTOPEDGECASESBREAKPOINT,
    isXLDesktop: width >= XLDESKTOPBREAKPOINT,
  };
};
