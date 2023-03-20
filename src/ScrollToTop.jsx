import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname: currentPath } = useLocation();

  useEffect(() => {
    const prevPath = sessionStorage.getItem('prevPath');
    if (prevPath && prevPath !== currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    sessionStorage.setItem('prevPath', currentPath);
  }, [currentPath]);

  return null;
}

export default ScrollToTop;
