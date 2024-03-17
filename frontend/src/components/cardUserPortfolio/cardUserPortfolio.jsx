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
import { useEffect} from 'react';
import axios from 'axios';
import getCookie from './../../helpers/getCsrfToken';

const csrftoken = getCookie('csrftoken');
const CardUserPortfolio = ({
  title,
  description,
  id,
  user,
  images,
  username,
  userImage,
  profession,
  favorites,
  userId,
  cb,
  updateFavoritesProject,
}) => {
  const handleFavorite = async () => {
    if (favorites) {
      const newFavorites = updateFavoritesProject(id);
      try {
        const response = await axios.patch(
          `http://localhost:8000/user-profile/${userId}/`,
          {
            portfolio_favorites: newFavorites,
          },
          {
            headers: {
              'X-CSRFToken': csrftoken,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );
      } catch (error) {
        console.log(error);
      } finally {
        cb();
      }
    }
    else {
      const newFavorites = updateFavoritesProject(id);
      try {
        const response = await axios.patch(
          `http://localhost:8000/user-profile/${userId}/`,
          {
            portfolio_favorites: newFavorites,
          },
          {
            headers: {
              'X-CSRFToken': csrftoken,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        cb()
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.card__items}>
        <div className={styles['card__item-left']}>
          <div className={styles.slider}>
            <Swiper
              pagination={{
                type: 'fraction',
              }}
              slidesPerView={1}
              //loop={true}
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
              <span className={styles.card__id}>{username}</span>
            </Link>
            <p className={styles.card__profession}>{profession}</p>
          </div>
        </div>
        <div className={styles['card__item-right']}>
          <div className={styles['card__right-top']}>
            <h3 className={styles['card__item-title']}>
              <abbr title={title}>{title}</abbr>
            </h3>
            <p className={styles['card__item-text']}>{description}</p>
          </div>
          <div className={styles['card__user-add']}>
            {
              userId && (<div
              className={styles['card__user-favorite']}
              onClick={handleFavorite}
            >
              <svg
                height="64px"
                width="64px"
                version="1.1"
                id="_x32_"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier" fill="#ff0808">
                  {' '}
                  <g>
                    {favorites ? (
                      <path d="M380.63,32.196C302.639,33.698,264.47,88.893,256,139.075c-8.47-50.182-46.638-105.378-124.63-106.879 C59.462,30.814,0,86.128,0,187.076c0,129.588,146.582,189.45,246.817,286.25c3.489,3.371,2.668,3.284,2.668,3.284 c1.647,2.031,4.014,3.208,6.504,3.208v0.011c0,0,0.006,0,0.011,0c0,0,0.006,0,0.011,0v-0.011c2.489,0,4.856-1.177,6.503-3.208 c0,0-0.821,0.086,2.669-3.284C365.418,376.526,512,316.664,512,187.076C512,86.128,452.538,30.814,380.63,32.196z"></path>
                    ) : (
                      <path d="M373.597,29.736c-0.938,0-1.856,0.009-2.795,0.03C313.675,30.864,276.726,59.028,256,93.182 c-20.726-34.154-57.675-62.318-114.802-63.416c-0.928-0.021-1.866-0.03-2.796-0.03c-38.566,0-73.559,15.465-98.518,43.538 C13.797,102.626,0,143.789,0,192.309c0,95.273,76.404,153.378,150.284,209.566c28.513,21.684,57.975,44.098,83.483,68.688 l1.138,1.547c5.062,6.24,12.419,9.904,20.296,10.134l0.8,0.02l0.838-0.02c7.847-0.24,15.186-3.894,20.247-10.114l1.158-1.578 c25.498-24.59,54.97-47.003,83.473-68.678C435.596,345.687,512,287.583,512,192.309C512,96.586,455.083,29.736,373.597,29.736z M371.391,357.748c-37.12,28.952-78.172,57.866-113.654,92.099c-0.689,0.668-1.248,1.238-1.747,1.777 c-0.519-0.549-1.018-1.088-1.726-1.777c-47.303-45.615-104.52-81.895-149.116-121.202c-22.313-19.618-41.412-39.904-54.79-62.088 c-13.378-22.204-21.184-46.164-21.215-74.248c0.02-44.228,12.81-77.493,32.528-99.677c19.757-22.164,46.573-33.705,76.733-33.764 l2.237,0.03c33.775,0.708,57.835,12.67,75.017,29.681c17.132,17.022,27.165,39.556,30.77,60.99 c0.788,4.682,4.821,8.097,9.574,8.097c4.752,0,8.785-3.414,9.574-8.097c3.604-21.434,13.638-43.967,30.77-60.99 c17.181-17.012,41.242-28.973,75.017-29.681l2.236-0.03c30.161,0.059,56.976,11.6,76.735,33.764 c19.717,22.184,32.507,55.449,32.526,99.677c-0.03,28.084-7.837,52.044-21.215,74.248 C441.605,299.833,408.54,328.815,371.391,357.748z"></path>
                    )}
                  </g>{' '}
                </g>
              </svg>
            </div>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardUserPortfolio;
