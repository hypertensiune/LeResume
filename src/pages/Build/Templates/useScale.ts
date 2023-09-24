import { useState, useEffect } from "react";

export default function useScale() {

  const [scale, setScale] = useState(0.7);

  useEffect(() => {
    if (typeof window !== "undefined") {

      const resize = () => {
        let initialScale = 0.7;
        if (window.innerWidth < 650) {
          initialScale = 1.8;
        }

        setScale(initialScale * (window.innerWidth / 1920))
      }

      window.addEventListener('resize', resize);

      resize();

      return () => window.removeEventListener('resize', resize);

    }
  }, []);

  return scale;
}