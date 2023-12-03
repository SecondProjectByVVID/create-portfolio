import { useEffect, useState } from 'react';
import TitleForm from '../../ui/TitleForm/TitleForm';
import InputForm from '../../ui/inputForm/InputForm';
import UserIcon from './../../assets/icons/user-icon.svg';
import PhoneIcon from './../../assets/icons/phone-icon.svg';
import PasswordIcon from './../../assets/icons/password-icon.svg';
import useValidate from '../../hooks/useValidate';
import useForm from '../../hooks/useForm';

import './signUp.scss';
import ButtonForm from '../../ui/ButtonForm/ButtonForm';
import { useAuth } from '../../hooks/useAuth';

const SignUp = () => {
  const [reg] = useState(
    JSON.parse(localStorage.getItem('signUp')) || {
      name: '',
      email: '',
      mobile: '',
      surname: '',
      password: ''
    }
  );
  const { form, formChange } = useForm(reg);
  const { validate, error } = useValidate(form);
  const { signUp } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    validate();
  };
  useEffect(() => {
    const isValidate = Object.keys(error).length === 0;
    if (isValidate) {
      signUp(form);
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
                value={form.name}
                type={'text'}
                placeholder={'Имя'}
                onChange={formChange}
                error={error}
                id={'name'}
              />
              <InputForm
                value={form.surname}
                type={'text'}
                placeholder={'Фамилия'}
                onChange={formChange}
                error={error}
                id={'surname'}
              />
              <InputForm
                img={UserIcon}
                value={form.email}
                placeholder={'Почта'}
                onChange={formChange}
                error={error}
                id={'email'}
              />
              <InputForm
                img={PasswordIcon}
                value={form.password}
                type={'password'}
                placeholder={'Пароль'}
                onChange={formChange}
                error={error}
                id={'password'}
              />
              <InputForm
                img={PhoneIcon}
                value={form.mobile}
                placeholder={'+79000000000'}
                onChange={formChange}
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
