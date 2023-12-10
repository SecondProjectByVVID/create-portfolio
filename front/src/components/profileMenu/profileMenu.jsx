import { useSelector } from 'react-redux';
import getIconKey from '../../helpers/getImageKey';
import { Link } from 'react-router-dom/dist/umd/react-router-dom.development';
import { localStorageService } from './../../service/localStorage.service';

import './profileMenu.scss';

const ProfileMenu = () => {
  const { user } = useSelector((state) => state.signIn);
  const handleClick = () => {
    localStorageService.removeAllAuth();
    window.location.reload();
  };
  return (
    <div className="profile">
      <div className="profile__user">
        <div className="profile__user-img">
          <img className="profile__user-icon" src={getIconKey('AvatarIcon')} alt="avatar icon" />
        </div>
        <div className="profile__user-info">
          <h3 className="profile__user-name">{`${user.name}  ${user.surname}`}</h3>
          <p className="profile__user-email">{user.email}</p>
        </div>
      </div>
      <ul className="profile__list">
        <li className="profile__list-item">
          <Link to="/profile">
            <p className="profile__list-text">Профиль</p>
            <img src={getIconKey('ProfileIcon')} alt="profile icon" />
          </Link>
        </li>
        <li className="profile__list-item">
          <Link to="/chat">
            <p className="profile__list-text">Чат</p>
            <img src={getIconKey('ChatIcon')} alt="chat icon" />
          </Link>
        </li>
        <li className="profile__list-item" onClick={() => handleClick()}>
          <p className="profile__list-text">Выход</p>
          <img src={getIconKey('LogoutIcon')} alt="logout icon" />
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
