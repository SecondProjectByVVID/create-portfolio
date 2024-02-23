import { Link } from 'react-router-dom';

import './SingIn.scss';
import { getIconKey } from '../../helpers/getImageKey';

import InputForm from '../../UI/InputForm/InputForm';
import ButtonForm from '../../UI/ButtonForm/ButtonForm';
import ForgetLink from '../../UI/ForgetLink/ForgetLink';
import TitleForm from '../../UI/TitleForm/TitleForm';

import useForm from '../../hooks/useForm';
import { useAuth } from './../../hooks/useAuth';
import ReCAPTCHA from 'react-google-recaptcha';
import { localStorageService } from '../../service/localStorage.service';
import apiConfig from './../../config/config.request.json';
import { useState } from 'react';
const SingIn = () => {
  const [auth] = useState({
    email: '',
    password: ''
  });
  const { signIn } = useAuth();
  const { form, formChange, setForm } = useForm(auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(form);
  };
  const captchaChange = (e) => {
    setForm((prevState) => ({ ...prevState, g_recaptcha_response: e }));
  };
  return (
    <div className="login">
      <div className="login__inner">
        <TitleForm textField={'Авторизация'} />
        <div className="login__form">
          <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <InputForm
              img={getIconKey('UserIcon')}
              value={form.email}
              placeholder={'Почта'}
              onChange={formChange}
              id={'email'}
            />
            <InputForm
              img={getIconKey('PasswordIcon')}
              value={form.password}
              type={'password'}
              placeholder={'Пароль'}
              onChange={formChange}
              id={'password'}
            />
            <ForgetLink text={'Забыли пароль?'} type={'link'} />
            <ButtonForm textField={'Войти'} btnClass={'form__sign-in'} />
            {localStorageService.getCaptcha() && (
              <ReCAPTCHA
                sitekey={apiConfig.keyCaptcha}
                onChange={captchaChange}
                name="g-recaptcha-response"
              />
            )}
            <div className="form__create-acc">
              <p>Нет аккаунта?</p>
            </div>
            <Link to="/signUp" className="link__sing-up">
              <ButtonForm textField={'Регистрация'} btnClass={'form__sign-up'} />
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingIn;
