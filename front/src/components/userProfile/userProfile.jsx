import getIconKey from './../../helpers/getImageKey';
import './userProfile.scss';
const UserProfile = () => {
  return (
    <div className="header__auth">
      <button className="header__create-btn">Создать</button>
      <div className="header__user">
        <img className="header__user-icon" src={getIconKey('AvatarIcon')} alt="icon avatar" />
      </div>
    </div>
  );
};

export default UserProfile;
