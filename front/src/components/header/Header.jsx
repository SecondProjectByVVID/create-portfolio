import { Link } from 'react-router-dom/dist/umd/react-router-dom.development';
import getIconKey from './../../helpers/getImageKey';
import ButtonForm from '../../ui/buttonForm/ButtonForm';
import UserProfile from '../userProfile/userProfile';
import usePosition from './../../hooks/usePosition';
import { useState } from 'react';
import { localStorageService } from '../../service/localStorage.service';
import Skeleton from './../../ui/skeleton/Skeleton';
import AppImage from './../../ui/appImages/AppImage';
import './Header.scss';
const Header = () => {
  const [isLogin] = useState(localStorageService.getIsLogin());
  const { position } = usePosition();
  return (
    <div className="header">
      <div className="header__inner">
        <div className="header__logo">
          <AppImage
            src={getIconKey('LogoIcon')}
            alt={'header logo'}
            className={'header__logo-img'}
            fallback={<Skeleton size={{ width: '100%', height: '50px', borderRadius: '5%' }} />}
          />
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
            {position ? (
              <>
                <AppImage
                  src={getIconKey('LocationIcon')}
                  alt={'icon location'}
                  className={'header__location-img'}
                  fallback={
                    <Skeleton size={{ width: '32px', height: '32px', borderRadius: '3px' }} />
                  }
                />
                <p className="header__location-text">{position}</p>
              </>
            ) : (
              <Skeleton size={{ width: '100px', height: '50px', borderRadius: '5%' }} />
            )}
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
