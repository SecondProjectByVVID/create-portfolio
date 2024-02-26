import { useRef, useState } from 'react';
import { getIconKey } from './../../helpers/getImageKey';
import { Link } from 'react-router-dom/dist/umd/react-router-dom.development';

import { Sidebar } from 'primereact/sidebar';
import Skeleton from '../../UI/skeleton/Skeleton';
import AppImage from '../../UI/appImages/AppImage';
import ProfileMenu from '../profileMenu/profileMenu';

import './userProfile.scss';
import { createPortal } from 'react-dom';

const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  const handleProfile = () => {
    setOpen((state) => !state);
  };
  const handleClickOutside = ({ target }) => {
    if (ref.current && ref.current.contains(target)) {
      setOpen((state) => !state);
    }
  };
  return (
    <div className="header__auth">
      <Link to="/add-portfolio">
        <button className="header__create-btn">Создать</button>
      </Link>
      <div className="header__user" onClick={() => handleProfile()}>
        <AppImage
          src={getIconKey('AvatarIcon')}
          alt={'avatar icon'}
          className={'header__user-icon'}
          fallback={<Skeleton size={{ width: '42px', height: '42px', borderRadius: '50%' }} />}
        />
      </div>
      {open &&
        createPortal(
          <ProfileMenu
            refProp={ref}
            handleClickOutside={handleClickOutside}
            setVisible={setVisible}
          />,
          document.body
        )}
      {createPortal(
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <h2>Sidebar</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </Sidebar>,
        document.body
      )}
    </div>
  );
};

export default UserProfile;
