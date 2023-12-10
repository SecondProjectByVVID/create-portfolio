import { useState } from 'react';
import getIconKey from './../../helpers/getImageKey';
import './userProfile.scss';
import ProfileMenu from '../profileMenu/profileMenu';
const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const handleProfile = () => {
    setOpen((state) => !state);
  };
  return (
    <div className="header__auth">
      <button className="header__create-btn">Создать</button>
      <div className="header__user" onClick={() => handleProfile()}>
        <img className="header__user-icon" src={getIconKey('AvatarIcon')} alt="icon avatar" />
      </div>
      {open ? <ProfileMenu /> : ''}
    </div>
  );
};

export default UserProfile;
