import { useEffect, useState } from 'react';

import TitleForm from '../../ui/TitleForm/TitleForm';
import InputForm from '../../ui/inputForm/InputForm';
import ButtonForm from '../../ui/ButtonForm/ButtonForm';

import getIconKey from '../../helpers/getImageKey';

import useValidate from '../../hooks/useValidate';
import useForm from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';

import './signUp.scss';

const SignUp = () => {
  const [reg] = useState(
    JSON.parse(localStorage.getItem('signUp')) || {
      name: '',
      email: '',
      mobile: '',
      surname: '',
      password: '',
      repeatPassword: '',
      profession: ''
    }
  );
  const { form, formChange } = useForm(reg);
  const { validate, error } = useValidate(form);
  const { signUp } = useAuth();
  const handleSubmit = (e) => {
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
                img={getIconKey('UserIcon')}
                value={form.email}
                placeholder={'Почта'}
                onChange={formChange}
                error={error}
                id={'email'}
              />
              <InputForm
                img={getIconKey('PhoneIcon')}
                value={form.mobile}
                placeholder={'+79000000000'}
                onChange={formChange}
                error={error}
                id={'mobile'}
              />
              <InputForm
                img={getIconKey('PasswordIcon')}
                value={form.password}
                type={'password'}
                placeholder={'Пароль'}
                onChange={formChange}
                error={error}
                id={'password'}
              />
              <InputForm
                img={getIconKey('PasswordIcon')}
                value={form.repeatPassword}
                type={'password'}
                placeholder={'Повторите пароль'}
                onChange={formChange}
                error={error}
                id={'repeatPassword'}
              />
              <InputForm
                img={getIconKey('WorkIcon')}
                value={form.profession}
                type={'text'}
                placeholder={'Ваша профессия'}
                onChange={formChange}
                error={error}
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
