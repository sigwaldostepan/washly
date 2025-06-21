import { useMediaQuery } from 'react-responsive';

export const useDeviceScreen = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
  const isLaptop = useMediaQuery({ query: '(min-width: 1024px) and (max-width: 1279px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
  };
};
