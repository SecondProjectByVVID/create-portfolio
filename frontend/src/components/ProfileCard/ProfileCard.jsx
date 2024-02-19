import { useState } from 'react';
import InputForm from './../../UI/InputForm/InputForm';
import UploadFile from './../../UI/chooseFile/UploadFile';
import usePosition from '../../hooks/usePosition';

import './ProfileCard.scss';

// import { useFetchInfoProfileQuery } from '../../store/profile/ProfileSlice';
const ProfileCard = () => {
  // const { data: userProfile, isLoading, error } = useFetchInfoProfileQuery();
  const { position } = usePosition();
  const [profile] = useState({
    id: 0,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    profession: '',
    location: position
  });
  const [image, setImage] = useState(null);
  const profileChange = () => {};
  const profileSubmit = (e) => {
    e.preventDefault();
  };
  const cancelProfile = () => {
    setImage(null);
  };
  return (
    <div className="profile__card">
      <div className="profile__card-container">
        <div className="profile__card-image">
          <UploadFile
            withExtendedField={true}
            extendedText={'Добавьте фото'}
            image={image}
            setImage={setImage}
            id={'profile-image__upload'}
          />
        </div>
        <div className="profile__card-description">
          <h1 className="profile__description-title">Личные данные</h1>
          <form className="profile__description-form" onSubmit={profileSubmit}>
            <label htmlFor="first_name" className="profile__description-label">
              <p>Имя</p>
              <InputForm
                value={profile.first_name}
                placeholder={'Ваше имя'}
                onChange={profileChange}
                id={'first_name'}
              />
            </label>
            <label htmlFor="first_name" className="profile__description-label">
              <p>Фамилия:</p>
              <InputForm
                value={profile.last_name}
                placeholder={'Ваше фамилия'}
                onChange={profileChange}
                id={'last_name'}
              />
            </label>
            <label htmlFor="first_name" className="profile__description-label">
              <p>E-mail:</p>
              <InputForm
                value={profile.email}
                placeholder={'Ваше почта'}
                onChange={profileChange}
                id={'email'}
              />
            </label>
            <label htmlFor="first_name" className="profile__description-label">
              <p>Телефон:</p>
              <InputForm
                value={profile.mobile}
                placeholder={'Ваш телефон'}
                onChange={profileChange}
                id={'mobile'}
              />
            </label>
            <label htmlFor="first_name" className="profile__description-label">
              <p>Профессия:</p>
              <InputForm
                value={profile.profession}
                placeholder={'Ваша профессия'}
                onChange={profileChange}
                id={'profession'}
              />
            </label>
            <h2 className="profile__description-subtitle">Описание</h2>
            <textarea
              className="profile__description-textarea"
              name="description"
              id="description"
              cols="30"
              rows="10"
              placeholder="Добавьте описание о себе и ваших навыках..."></textarea>
            <div className="profile__description-btns">
              <button className="profile__btn-save" type="submit">
                Сохранить
              </button>
              <button className="profile__btn-cancel" onClick={cancelProfile}>
                Отменить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
