import { useRef, useState } from 'react';
import { getIconKey } from './../../helpers/getImageKey';
import { Link } from 'react-router-dom/dist/umd/react-router-dom.development';

import Skeleton from './../../UI/skeleton/Skeleton';
import { Sidebar } from 'primereact/sidebar';
import AppImage from '../../UI/appImages/AppImage';
import ProfileMenu from '../profileMenu/profileMenu';
import { localStorageService } from './../../service/localStorage.service';
import {
  useFetchContactUsQuery,
  useFetchInfoUserQuery,
} from './../../store/user/UserSlice';
import { Card } from 'primereact/card';

import './userProfile.scss';
import { createPortal } from 'react-dom';

const UserProfile = () => {
  const {
    data: userInfo,
    error: isError,
    isLoading,
  } = useFetchInfoUserQuery(localStorageService.getUserId()?.toString());
  const {
    data: contactUs,
    error: contactError,
    isLoading: contactLoading,
  } = useFetchContactUsQuery(localStorageService.getUserId()?.toString());
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
      {!isLoading && !isError ? (
        <div className="header__user" onClick={() => handleProfile()}>
          <AppImage
            src={userInfo.image ?? getIconKey('AvatarIcon')}
            alt={'avatar icon'}
            className={'header__user-icon'}
            fallback={
              <Skeleton
                size={{ width: '42px', height: '42px', borderRadius: '50%' }}
              />
            }
          />
        </div>
      ) : (
        <Skeleton
          size={{ width: '42px', height: '42px', borderRadius: '50%' }}
        />
      )}
      {open &&
        createPortal(
          <ProfileMenu
            refProp={ref}
            handleClickOutside={handleClickOutside}
            setVisible={setVisible}
            userInfo={userInfo}
          />,
          document.body,
        )}
      {createPortal(
        <Sidebar
          visible={visible}
          onHide={() => setVisible(false)}
          style={{ maxWidth: '440px', width: '100%' }}
        >
          <h2
            style={{
              fontSize: '1.6rem',
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            С вами хотели связаться:
          </h2>
          {!contactError && !contactLoading ? (
            contactUs.map((item) => (
              <div className="contact-card" key={item.id}>
                <Card
                  title={item.email}
                  style={{
                    background: '#eeeeee',
                    boxShadow: `0 2px 4px -2px rgba(0, 0, 0, 0.2),
                4px 7px 5px 0 rgba(0, 0, 0, 0.14),
                6px 6px 15px 0 rgba(0, 0, 0, 0.12)`,
                  }}
                >
                  <div className="contact__card-description">
                    {item.description}
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <>
              <Skeleton
                size={{ width: '100%', height: '100px', borderRadius: '10px' }}
              />
              <Skeleton
                size={{ width: '100%', height: '100px', borderRadius: '10px' }}
              />
            </>
          )}
        </Sidebar>,
        document.body,
      )}
    </div>
  );
};

export default UserProfile;
