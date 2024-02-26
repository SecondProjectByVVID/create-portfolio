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

const CardUserPortfolio = ({ title, description, id, portfolioId }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card__items}>
        <div className={styles['card__item-left']}>
          <div className={styles.slider}>
            <Swiper
              pagination={{
                type: 'fraction'
              }}
              loop={true}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper">
              <SwiperSlide>
                <img
                  className={styles.slider__img}
                  src={getIconKey('CardDefaultBg')}
                  alt="card bg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className={styles.slider__img}
                  src={getIconKey('CardDefaultBg')}
                  alt="card bg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className={styles.slider__img}
                  src={getIconKey('CardDefaultBg')}
                  alt="card bg"
                />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className={styles['card__item-user']}>
            <div className={styles['card__user-avatar']}>
              <Link to={`/user-portfolio/${id}/${portfolioId}`}>
                <img
                  className={styles['card__user-icon']}
                  src={getIconKey('AvatarIcon')}
                  alt="icon avatar"
                />
              </Link>
            </div>
            <p className={styles.card__id}>#25353663</p>
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
