import { Link, useLocation } from 'react-router-dom/dist/umd/react-router-dom.development';
import { getIconKey } from './../../helpers/getImageKey';
import ButtonForm from '../../UI/ButtonForm/ButtonForm';
import UserProfile from '../userProfile/userProfile';
import usePosition from './../../hooks/usePosition';
import { useState } from 'react';
import { localStorageService } from '../../service/localStorage.service';
import Skeleton from './../../UI/skeleton/Skeleton';
import AppImage from './../../UI/appImages/AppImage';
import './Header.scss';

const Header = () => {
  const [isLogin] = useState(localStorageService.getIsLogin());
  const { position } = usePosition();
  const { pathname } = useLocation()
  return (
    <div className="header">
      <div className="header__inner">
        <div className="header__logo">
          <Link to="/">
            <AppImage
              src={getIconKey('LogoIcon')}
              alt={'header logo'}
              className={'header__logo-img'}
              fallback={
                <Skeleton
                  size={{ width: '100%', height: '50px', borderRadius: '5%' }}
                />
              }
            />
          </Link>
        </div>
        <nav className="header__navbar">
          <ul className="header__list">
            <li className="header__list-item">
              <Link to="/" className={pathname === '/' ? `header__list-link link--active` : `header__list-link`}>
                Главная
              </Link>
            </li>
            <li className="header__list-item">
              <Link to="/favorites" className={pathname === '/favorites' ? `header__list-link link--active` : `header__list-link`}>
                Избранное
              </Link>
            </li>
            <li className="header__list-item">
              <Link to="/my-projects" className={pathname === '/my-projects' ? `header__list-link link--active` : `header__list-link`}>
                Мои проекты
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
                    <Skeleton
                      size={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '3px',
                      }}
                    />
                  }
                />
                <p className="header__location-text">{position}</p>
              </>
            ) : (
              <Skeleton
                size={{ width: '100px', height: '50px', borderRadius: '5%' }}
              />
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
