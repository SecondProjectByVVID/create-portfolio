import { getIconKey } from '../../helpers/getImageKey';
import styles from './cardUserPortfolio.module.scss';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const CardUserPortfolio = ({
  title,
  description,
  id,
  user,
  images,
  username,
  userImage,
  profession,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.card__items}>
        <div className={styles['card__item-left']}>
          <div className={styles.slider}>
            <Swiper
              pagination={{
                type: 'fraction',
              }}
              loop={true}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <Link to={`/user-portfolio/${user}/${id}`}>
                    <img
                      className={styles.slider__img}
                      src={image.image ?? getIconKey('CardDefaultBg')}
                      alt="card bg"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={styles['card__item-user']}>
            <div className={styles['card__user-avatar']}>
              <Link to={`/user-portfolio/${user}/${id}`}>
                <img
                  className={styles['card__user-icon']}
                  src={userImage ?? getIconKey('AvatarIcon')}
                  alt="icon avatar"
                />
              </Link>
            </div>
            <Link to={`/user-portfolio/${user}/${id}`}>
              <p className={styles.card__profession}>{profession}</p>
            </Link>
            <span className={styles.card__id}>{username}</span>
            {/* <div className={styles['card__user-add']}>
              <div className={styles['card__user-favorite']}>
                <svg
                  width="64px"
                  height="64px"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {' '}
                    <path
                      d="M45.35 6.1709H19.41C16.8178 6.17618 14.3333 7.20827 12.5003 9.04123C10.6674 10.8742 9.63528 13.3587 9.62999 15.9509V52.2709C9.6272 53.3655 9.92973 54.4392 10.5036 55.3713C11.0775 56.3034 11.9 57.057 12.8787 57.5474C13.8573 58.0377 14.9533 58.2454 16.0435 58.1471C17.1337 58.0488 18.1748 57.6484 19.05 56.9909L31.25 47.8509C31.5783 47.6074 31.9762 47.4759 32.385 47.4759C32.7938 47.4759 33.1917 47.6074 33.52 47.8509L45.71 56.9809C46.5842 57.6387 47.6246 58.0397 48.7142 58.1387C49.8038 58.2378 50.8994 58.0311 51.8779 57.5418C52.8565 57.0525 53.6793 56.3001 54.2537 55.3689C54.8282 54.4378 55.1317 53.365 55.13 52.2709V15.9509C55.1247 13.3587 54.0926 10.8742 52.2597 9.04123C50.4267 7.20827 47.9422 6.17618 45.35 6.1709Z"
                      fill="#7d7d7d"
                    ></path>{' '}
                  </g>
                </svg>
              </div>
              <div className={styles['card__user-playlist']}>
                <svg
                  width="64px"
                  height="64px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {' '}
                    <path
                      d="M14 7V13M11 10H17M14 21C11 21 8 21 5 21C3.89543 21 3.00001 20.1069 3.00001 19.0023C3 16.2888 3 11.5934 3 10M9 17H19C20.1046 17 21 16.1046 21 15V5C21 3.89543 20.1046 3 19 3H9C7.89543 3 7 3.89543 7 5V15C7 16.1046 7.89543 17 9 17Z"
                      stroke="#7d7d7d"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{' '}
                  </g>
                </svg>
              </div>
            </div> */}
          </div>
        </div>
        <div className={styles['card__item-right']}>
          <h3 className={styles['card__item-title']}>
            <abbr title={title}>{title}</abbr>
          </h3>
          <p className={styles['card__item-text']}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardUserPortfolio;
