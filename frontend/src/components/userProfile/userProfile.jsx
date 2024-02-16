import { useState } from 'react';
import { getIconKey } from './../../helpers/getImageKey';

import Skeleton from '../../ui/skeleton/Skeleton';
import AppImage from '../../ui/appImages/AppImage';
import ProfileMenu from '../profileMenu/profileMenu';

import './userProfile.scss';

const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const handleProfile = () => {
    setOpen((state) => !state);
  };
  return (
    <div className="header__auth">
      <button className="header__create-btn">Создать</button>
      <div className="header__user" onClick={() => handleProfile()}>
        <AppImage
          src={getIconKey('AvatarIcon')}
          alt={'avatar icon'}
          className={'header__user-icon'}
          fallback={<Skeleton size={{ width: '42px', height: '42px', borderRadius: '50%' }} />}
        />
      </div>
      {open && <ProfileMenu />}
    </div>
  );
};

export default UserProfile;
