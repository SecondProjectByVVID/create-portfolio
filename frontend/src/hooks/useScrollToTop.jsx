import { useState, useEffect } from 'react';

const useScrollToTop = () => {
  const [toTop, setToTop] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      console.log(window.pageYOffset, window.innerHeight);
      if (window.pageYOffset >= 360) {
        setToTop(true);
      } else {
        setToTop(false);
      }
    });
    return () =>
      window.removeEventListener('scroll', () => {
        setToTop(false);
      });
  });
  return { toTop };
};

export default useScrollToTop;
