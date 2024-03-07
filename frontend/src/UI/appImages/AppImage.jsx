import PropTypes from 'prop-types';
import { useLayoutEffect, useState } from 'react';
const AppImage = (props) => {
  const { src, alt, className, fallback, errFallback } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useLayoutEffect(() => {
    const image = new Image();
    image.src = src ?? '';
    image.onload = () => {
      setIsLoading(false);
    };
    image.onerror = () => {
      setIsLoading(false);
      setError(true);
    };
  }, [src]);

  if (isLoading && fallback) return fallback;
  if (error && errFallback) return errFallback;

  return <img className={className} src={src} alt={alt} />;
};

AppImage.defaultProps = {
  alt: 'image',
  className: '',
};
AppImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  fallback: PropTypes.node,
  errFallback: PropTypes.node,
};
export default AppImage;
