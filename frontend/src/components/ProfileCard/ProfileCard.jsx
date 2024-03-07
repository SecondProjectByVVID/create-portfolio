import { useEffect, useState } from 'react';
import InputForm from './../../UI/InputForm/InputForm';
import UploadFile from './../../UI/chooseFile/UploadFile';
import usePosition from '../../hooks/usePosition';
import { useFetchInfoProfileQuery } from '../../store/profile/ProfileSlice';
import { localStorageService } from '../../service/localStorage.service';
import Loader from './../../UI/Loader/Loader';
import './ProfileCard.scss';
import { uploadImage } from '../../helpers/uploadImage';
import profileReq from '../../api/profileReq';
import ApiConfig from './../../config/config.request.json';

const ProfileCard = () => {
  const {
    data: userProfile,
    isLoading,
    isError,
    refetch,
  } = useFetchInfoProfileQuery(localStorageService.getUserId());
  const { position } = usePosition();
  const [profile, setProfile] = useState({
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    profession: '',
    location: '',
    description: '',
    image: null,
  });
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (position) {
      setProfile((prevState) => ({ ...prevState, location: position }));
    }
    if (userProfile) {
      setProfile((prevState) => ({ ...prevState, ...userProfile[0] }));
    }
  }, [userProfile]);
  const profileChange = ({ target }) => {
    if (target.name !== 'image') {
      setProfile((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    } else {
      uploadImage(target, setImage);
      setProfile((prevState) => ({
        ...prevState,
        [target.name]: target.files[0],
      }));
    }
  };
  const profileSubmit = (e) => {
    e.preventDefault();
    console.log(profile);
    // const formDataWithImage = new FormData();
    // for (const key in profile) {
    //   formDataWithImage.append(key, profile[key]);
    // }
    // for (const key in profile) {
    //   console.log(formDataWithImage.getAll(key));
    // }
    profileReq.updateProfile(localStorageService.getUserId(), profile);
    refetch();
  };
  const cancelProfile = async () => {
    setImage(null);
    const { data } = await refetch();
    setProfile((prevState) => ({ ...data[0], ...prevState }));
  };
  if (isLoading || isError) {
    return <Loader />;
  }
  return (
    <div className="profile__card">
      <div className="profile__card-container">
        <div className="profile__card-image">
          <UploadFile
            withExtendedField={true}
            extendedText={'Добавьте фото'}
            image={
              profile.image && !image
                ? `${ApiConfig.url}${profile.image}`
                : image
            }
            setImage={setImage}
            onChange={profileChange}
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
            <label htmlFor="last_name" className="profile__description-label">
              <p>Фамилия:</p>
              <InputForm
                value={profile.last_name}
                placeholder={'Ваше фамилия'}
                onChange={profileChange}
                id={'last_name'}
              />
            </label>
            <label htmlFor="email" className="profile__description-label">
              <p>E-mail:</p>
              <InputForm
                value={profile.email}
                placeholder={'Ваше почта'}
                onChange={profileChange}
                id={'email'}
              />
            </label>
            <label htmlFor="mobile" className="profile__description-label">
              <p>Телефон:</p>
              <InputForm
                value={profile.mobile}
                placeholder={'Ваш телефон'}
                onChange={profileChange}
                id={'mobile'}
              />
            </label>
            <label htmlFor="profession" className="profile__description-label">
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
              value={profile.description}
              onChange={profileChange}
              placeholder="Добавьте описание о себе и ваших навыках..."
            ></textarea>
            <div className="profile__description-btns">
              <button className="profile__btn-save" type="submit">
                Сохранить
              </button>
              <button
                className="profile__btn-cancel"
                type="button"
                onClick={cancelProfile}
              >
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
