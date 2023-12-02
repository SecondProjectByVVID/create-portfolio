import { useEffect, useState } from 'react';
import TitleForm from '../../ui/TitleForm/TitleForm';
import InputForm from '../../ui/inputForm/InputForm';
import UserIcon from './../../assets/icons/user-icon.svg';
import PhoneIcon from './../../assets/icons/phone-icon.svg';
import PasswordIcon from './../../assets/icons/password-icon.svg';
import useValidate from '../../hooks/useValidate';

import userReq from './../../api/userReq';

import './signUp.scss';
import ButtonForm from '../../ui/ButtonForm/ButtonForm';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

const SignUp = () => {
  const [reg, setReg] = useState({
    name: '',
    email: '',
    mobile: '',
    surname: '',
    password: ''
  });
  const navigate = useNavigate();
  const { validate, error } = useValidate(reg);
  const handleChange = ({ target }) => {
    setReg((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    validate();
  };

  const registration = () => {
    userReq.create(reg).then((data) => (data ? navigate('/') : null));
  };
  useEffect(() => {
    const isValidate = Object.keys(error).length === 0;
    if (isValidate) {
      registration();
    }
  }, [error]);
  return (
    <div className="registr">
      <div className="registr__inner">
        <TitleForm textField={'Регистрация'} />
        <div className="registr__form">
          <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <div className="form__inner">
              <InputForm
                value={reg.name}
                type={'text'}
                placeholder={'Имя'}
                onChange={handleChange}
                error={error}
                id={'name'}
              />
              <InputForm
                value={reg.lastname}
                type={'text'}
                placeholder={'Фамилия'}
                onChange={handleChange}
                error={error}
                id={'surname'}
              />
              <InputForm
                img={UserIcon}
                value={reg.email}
                placeholder={'Почта'}
                onChange={handleChange}
                error={error}
                id={'email'}
              />
              <InputForm
                img={PasswordIcon}
                value={reg.password}
                type={'password'}
                placeholder={'Пароль'}
                onChange={handleChange}
                error={error}
                id={'password'}
              />
              <InputForm
                img={PhoneIcon}
                value={reg.phone}
                placeholder={'Номер телефона'}
                onChange={handleChange}
                error={error}
                id={'mobile'}
              />
            </div>
            {/* <Select /> */}
            <div className="reg__sign_up">
              <ButtonForm textField={'Регистрация'} btnClass={'form__sign-up'} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
