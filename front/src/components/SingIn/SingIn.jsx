import { Link } from 'react-router-dom';

import './singIn.scss';
import UserIcon from './../../assets/icons/user-icon.svg';
import PasswordIcon from './../../assets/icons/password-icon.svg';

import InputForm from '../../ui/inputForm/InputForm';
import ButtonForm from '../../ui/ButtonForm/ButtonForm';
import ForgetLink from '../../ui/ForgetLink/ForgetLink';
import TitleForm from '../../ui/TitleForm/TitleForm';

import useValidate from '../../hooks/useValidate';
import useForm from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';

const SingIn = () => {
  const auth = {
    email: '',
    password: ''
  };
  const { form, formChange } = useForm(auth);
  const { error } = useValidate(auth);
  const { signIn } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(form);
  };
  return (
    <div className="login">
      <div className="login__inner">
        <TitleForm textField={'Авторизация'} />
        <div className="login__form">
          <form className="form" onSubmit={(e) => handleSubmit(e)}>
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
            <ForgetLink />
            <ButtonForm textField={'Войти'} btnClass={'form__sign-in'} />
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
