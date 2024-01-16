import { Link } from 'react-router-dom/dist/umd/react-router-dom.development';
import getIconKey from './../../helpers/getImageKey';
import ButtonForm from '../../ui/ButtonForm/ButtonForm';
import './Header.scss';
import UserProfile from '../userProfile/userProfile';
import usePosition from './../../hooks/usePosition';
import { useState } from 'react';
import { localStorageService } from '../../service/localStorage.service';
const Header = () => {
  const [isLogin] = useState(localStorageService.getIsLogin());
  const { position } = usePosition();
  return (
    <div className="header">
      <div className="header__inner">
        <div className="header__logo">
          <img className="header__logo-img" src={getIconKey('LogoIcon')} alt="header logo" />
        </div>
        <nav className="header__navbar">
          <ul className="header__list">
            <li className="header__list-item">
              <Link to="/" className="header__list-link">
                Главная
              </Link>
            </li>
            <li className="header__list-item">
              <Link to="/favorites" className="header__list-link">
                Избранное
              </Link>
            </li>
          </ul>
          <div className="header__location">
            <img
              className="header__location-img"
              src={getIconKey('LocationIcon')}
              alt="icon location"
            />
            <p className="header__location-text">{position}</p>
          </div>
          {isLogin ? (
            <UserProfile />
          ) : (
            <Link to="/login">
              <ButtonForm textField={'Войти'} btnClass={'header__login-btn'} />
            </Link>
          )}
        </nav>
      </div>
      <hr />
    </div>
  );
};

export default Header;
