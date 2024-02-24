import styles from './ScrollTop.module.scss';
const ScrollTop = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className={styles.scroll} onClick={handleScrollTop}>
      <svg
        width="64px"
        height="64px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          {' '}
          <path
            d="M3.35288 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35288C10.9563 2.88237 13.0437 2.88237 15.0496 3.35288C17.827 4.00437 19.9956 6.17301 20.6471 8.95044C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95044 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95043Z"
            fill="#0889FF"
            fillOpacity="0.15"
            stroke="#0889FF"
            strokeWidth="1.5"></path>{' '}
          <path
            d="M12 15.5L12 8.5M12 8.5L9.5 11M12 8.5L14.5 11"
            stroke="#0889FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"></path>{' '}
        </g>
      </svg>
    </div>
  );
};

export default ScrollTop;
