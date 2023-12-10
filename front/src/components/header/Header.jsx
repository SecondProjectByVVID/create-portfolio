import { Link } from 'react-router-dom/dist/umd/react-router-dom.development';
import getIconKey from './../../helpers/getImageKey';
// import { localStorageService } from '../../service/localStorage.service';
import { useSelector } from 'react-redux';
import ButtonForm from '../../ui/ButtonForm/ButtonForm';
import './Header.scss';
import UserProfile from '../userProfile/userProfile';

const Header = () => {
  const { isLogin } = useSelector((state) => state.signIn);
  // const handleClick = () => {
  //   localStorageService.removeAllAuth();
  //   window.location.reload();
  // };
  return (
    <div className="header">
      <div className="header__inner">
        <div className="header__logo">
          <img className="header__logo-img" src="" alt="header logo" />
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
            <p className="header__location-text">Таганрог</p>
          </div>
          {isLogin ? (
            <UserProfile />
          ) : (
            <Link to="/login">
              <ButtonForm textField={'Войти'} btnClass={'header__login-btn'} />
            </Link>
          )}
          {/* <button onClick={() => handleClick()}>Logout</button> */}
        </nav>
      </div>
      <hr />
    </div>
  );
};

export default Header;
