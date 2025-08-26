import { useEffect, useState } from "react";

export default function useWindowSize() {
  const [screenSize, setScreenSize] = useState(() => window?.innerWidth);

  useEffect(() => {
    const onResize = () => {
      setScreenSize(window?.innerWidth);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return screenSize;
}