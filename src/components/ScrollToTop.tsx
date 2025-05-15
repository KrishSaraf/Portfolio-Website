import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// This component will automatically scroll to the top of the page
// whenever the route/pathname changes
const ScrollToTop: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset scroll position to top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Skip animation for immediate scrolling
    });
  }, [pathname]);

  return children ? <>{children}</> : null;
};

export default ScrollToTop; 