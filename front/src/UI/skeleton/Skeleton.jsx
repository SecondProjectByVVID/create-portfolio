import styles from './Skeleton.module.scss';
import PropTypes from 'prop-types';

const defaultSize = { width: '300px', height: '200px', borderRadius: '8px' };

const Skeleton = ({ size }) => {
  console.log(size);
  return <div style={{ ...defaultSize, ...size }} className={styles['cover-skeleton']}></div>;
};

Skeleton.defaultProps = {
  size: defaultSize
};
Skeleton.propTypes = {
  size: PropTypes.object
};
export default Skeleton;
