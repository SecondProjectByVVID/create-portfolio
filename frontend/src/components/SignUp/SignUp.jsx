import { useState } from 'react';

import TitleForm from '../../UI/TitleForm/TitleForm';
import InputForm from '../../UI/InputForm/InputForm';
import ButtonForm from '../../UI/ButtonForm/ButtonForm';

import { getIconKey } from '../../helpers/getImageKey';

import useForm from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';

import './signUp.scss';

const SignUp = () => {
  const [reg] = useState(
    JSON.parse(localStorage.getItem('signUp')) || {
      first_name: '',
      username: '',
      email: '',
      mobile: '',
      last_name: '',
      password: '',
      password2: '',
      profession: '',
      location: ''
    }
  );
  const { form, formChange } = useForm(reg);
  const { signUp, errors } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(form);
  };
  return (
    <div className="registr">
      <div className="registr__inner">
        <TitleForm textField={'Регистрация'} />
        <div className="registr__form">
          <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <div className="form__inner">
              <InputForm
                value={form.first_name}
                type={'text'}
                placeholder={'Имя'}
                onChange={formChange}
                id={'first_name'}
                error={errors?.first_name?.[0] || ''}
              />
              <InputForm
                value={form.last_name}
                type={'text'}
                placeholder={'Фамилия'}
                onChange={formChange}
                id={'last_name'}
                error={errors?.last_name?.[0] || ''}
              />
              <InputForm
                img={getIconKey('UserIcon')}
                value={form.email}
                placeholder={'Почта'}
                onChange={formChange}
                id={'email'}
                error={errors?.email?.[0] || ''}
              />
              <InputForm
                img={getIconKey('PhoneIcon')}
                value={form.mobile}
                placeholder={'+79000000000'}
                onChange={formChange}
                id={'mobile'}
              />
              <InputForm
                img={getIconKey('PasswordIcon')}
                value={form.password}
                type={'password'}
                placeholder={'Пароль'}
                onChange={formChange}
                id={'password'}
                error={errors?.password?.[0] || ''}
              />
              <InputForm
                img={getIconKey('PasswordIcon')}
                value={form.password2}
                type={'password'}
                placeholder={'Повторите пароль'}
                onChange={formChange}
                id={'password2'}
                error={errors?.password2?.[0] || ''}
              />
              <InputForm
                img={getIconKey('WorkIcon')}
                value={form.profession}
                type={'text'}
                placeholder={'Ваша профессия'}
                onChange={formChange}
                id={'profession'}
              />
            </div>
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
