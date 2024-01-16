import getIconKey from '../../helpers/getImageKey';
import { Link } from 'react-router-dom/dist/umd/react-router-dom.development';
import './profileMenu.scss';
import { useAuth } from '../../hooks/useAuth';
import AppImage from '../../ui/appImages/AppImage';
import Skeleton from './../../ui/skeleton/Skeleton';
import { localStorageService } from './../../service/localStorage.service';
import { useFetchInfoUserQuery } from './../../store/user/UserSlice';
const ProfileMenu = () => {
  const {
    data: userInfo,
    error,
    isLoading
  } = useFetchInfoUserQuery(localStorageService.getUserId()?.toString() || 1);
  const { logout } = useAuth();
  const handleClick = () => {
    logout();
  };
  return (
    <div className="profile">
      <div className="profile__user">
        <div className="profile__user-img">
          <AppImage
            src={getIconKey('AvatarIcon')}
            alt={'avatar icon'}
            className={'profile__user-icon'}
            fallback={<Skeleton size={{ width: '100%', height: '100%', borderRadius: '50%' }} />}
          />
        </div>
        <div className="profile__user-info">
          {error && 'Ошибка загрузки данных'}
          {isLoading ? (
            <Skeleton size={{ width: '145px', height: '40px', borderRadius: '9px' }} />
          ) : (
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
          )}
        </div>
      </div>
      <ul className="profile__list">
        <li className="profile__list-item">
          <Link to="/profile">
            <p className="profile__list-text">Профиль</p>
            <AppImage
              src={getIconKey('ProfileIcon')}
              alt={'profile icon'}
              fallback={<Skeleton size={{ width: '28px', height: '28px', borderRadius: '5px' }} />}
            />
          </Link>
        </li>
        <li className="profile__list-item">
          <Link to="/chat">
            <p className="profile__list-text">Чат</p>
            <AppImage
              src={getIconKey('ChatIcon')}
              alt={'chat icon'}
              fallback={<Skeleton size={{ width: '28px', height: '28px', borderRadius: '5px' }} />}
            />
          </Link>
        </li>
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
  );
};
export default ProfileMenu;
