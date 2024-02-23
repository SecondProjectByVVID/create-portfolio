import { getIconKey } from '../../helpers/getImageKey';
import styles from './cardUserPortfolio.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const CardUserPortfolio = () => {
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
              <img
                className={styles['card__user-icon']}
                src={getIconKey('AvatarIcon')}
                alt="icon avatar"
              />
            </div>
            <p className={styles.card__id}>#25353663</p>
          </div>
        </div>
        <div className={styles['card__item-right']}>
          <h3 className={styles['card__item-title']}>Наковальня</h3>
          <p className={styles['card__item-text']}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus mollitia ratione odio
            iusto necessitatibus asperiores blanditiis non facere ipsa. Vel voluptatibus soluta est
            harum ratione laborum voluptatum ducimus fugiat minus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardUserPortfolio;
