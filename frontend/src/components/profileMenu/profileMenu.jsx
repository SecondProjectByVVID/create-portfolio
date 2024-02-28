import { getIconKey } from '../../helpers/getImageKey';
import { Link } from 'react-router-dom/dist/umd/react-router-dom.development';
import './profileMenu.scss';
import { useAuth } from '../../hooks/useAuth';
import AppImage from '../../UI/appImages/AppImage';
import Skeleton from './../../UI/skeleton/Skeleton';
import PropTypes from 'prop-types';
import useWindowSize from '../../hooks/useWindowSize';
const ProfileMenu = ({ refProp, handleClickOutside, setVisible, userInfo }) => {
  const { logout } = useAuth();
  const { windowSize } = useWindowSize();
  const handleClick = () => {
    logout();
  };
  return (
    <div className="profile__container" ref={refProp} onClick={handleClickOutside}>
      <div className="profile">
        <div className="profile__user">
          <div className="profile__user-img">
            <>
              <AppImage
                src={userInfo.image ?? getIconKey('AvatarIcon')}
                alt={'avatar icon'}
                className={'profile__user-icon'}
                fallback={
                  <Skeleton size={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                }
              />
            </>
          </div>
          <div className="profile__user-info">
            <>
              <h3 className="profile__user-name">
                <abbr
                  title={`${userInfo.first_name} ${userInfo.last_name}`}>{`${userInfo.first_name} ${userInfo.last_name}`}</abbr>
              </h3>
              <p className="profile__user-email">
                {' '}
                <abbr title={`${userInfo.email}`}>{`${userInfo.email}`}</abbr>
              </p>
            </>
          </div>
        </div>
        <ul className="profile__list">
          <li className="profile__list-item">
            <Link to="/profile">
              <p className="profile__list-text">Профиль</p>
              <AppImage
                src={getIconKey('ProfileIcon')}
                alt={'profile icon'}
                fallback={
                  <Skeleton size={{ width: '28px', height: '28px', borderRadius: '5px' }} />
                }
              />
            </Link>
          </li>
          <li className="profile__list-item">
            <Link to="/chat">
              <p className="profile__list-text">Чат</p>
              <AppImage
                src={getIconKey('ChatIcon')}
                alt={'chat icon'}
                fallback={
                  <Skeleton size={{ width: '28px', height: '28px', borderRadius: '5px' }} />
                }
              />
            </Link>
          </li>
          <li className="profile__list-item" onClick={() => setVisible(true)}>
            <p className="profile__list-text">Сообщения</p>
            <AppImage
              src={getIconKey('ContactIcon')}
              alt={'chat icon'}
              fallback={<Skeleton size={{ width: '28px', height: '28px', borderRadius: '5px' }} />}
            />
          </li>
          {windowSize.width <= 480 && (
            <>
              <li className="profile__list-item">
                <Link to="/">
                  <p className="profile__list-text">Главная</p>
                  <AppImage
                    src={getIconKey('HomeIcon')}
                    alt={'chat icon'}
                    fallback={
                      <Skeleton size={{ width: '28px', height: '28px', borderRadius: '5px' }} />
                    }
                  />
                </Link>
              </li>
              <li className="profile__list-item">
                <Link to="/favorites">
                  <p className="profile__list-text">Избранное</p>
                  <AppImage
                    src={getIconKey('FavoritesIcon')}
                    alt={'chat icon'}
                    fallback={
                      <Skeleton size={{ width: '28px', height: '28px', borderRadius: '5px' }} />
                    }
                  />
                </Link>
              </li>
            </>
          )}
          <li className="profile__list-item" onClick={() => handleClick()}>
            <p className="profile__list-text">Выход</p>
            <AppImage
              src={getIconKey('LogoutIcon')}
              alt={'logout icon'}
              fallback={<Skeleton size={{ width: '28px', height: '28px', borderRadius: '5px' }} />}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

ProfileMenu.propTypes = {
  refProp: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  handleClickOutside: PropTypes.func
};
export default ProfileMenu;
