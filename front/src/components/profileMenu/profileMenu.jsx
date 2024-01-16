import getIconKey from '../../helpers/getImageKey';
import { Link } from 'react-router-dom/dist/umd/react-router-dom.development';
import PropTypes from 'prop-types';
import './profileMenu.scss';
import { useAuth } from '../../hooks/useAuth';

const ProfileMenu = ({ name, surname, email, error }) => {
  const { logout } = useAuth();
  const handleClick = () => {
    logout();
  };
  return (
    <div className="profile">
      <div className="profile__user">
        <div className="profile__user-img">
          <img className="profile__user-icon" src={getIconKey('AvatarIcon')} alt="avatar icon" />
        </div>
        <div className="profile__user-info">
          {error && 'Ошибка загрузки данных'}
          <h3 className="profile__user-name">
            <abbr title={`${name} ${surname}`}>{`${name} ${surname}`}</abbr>
          </h3>
          <p className="profile__user-email">
            {' '}
            <abbr title={`${email}`}>{`${email}`}</abbr>
          </p>
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
ProfileMenu.propTypes = {
  name: PropTypes.string,
  surname: PropTypes.string,
  email: PropTypes.string,
  error: PropTypes.string
};
export default ProfileMenu;
