import { useState } from 'react';
import getIconKey from './../../helpers/getImageKey';
import { useFetchInfoUserQuery } from './../../store/user/UserSlice';

import { localStorageService } from './../../service/localStorage.service';
import './userProfile.scss';
import ProfileMenu from '../profileMenu/profileMenu';
const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const {
    data: userInfo,
    error,
    isLoading
  } = useFetchInfoUserQuery(localStorageService.getUserId()?.toString() || 1);
  const handleProfile = () => {
    setOpen((state) => !state);
  };
  return (
    !isLoading && (
      <div className="header__auth">
        <button className="header__create-btn">Создать</button>
        <div className="header__user" onClick={() => handleProfile()}>
          <img className="header__user-icon" src={getIconKey('AvatarIcon')} alt="icon avatar" />
        </div>
        {open ? (
          <ProfileMenu
            name={userInfo.first_name}
            surname={userInfo.last_name}
            email={userInfo.email}
            error={error}
          />
        ) : (
          ''
        )}
      </div>
    )
  );
};

export default UserProfile;
