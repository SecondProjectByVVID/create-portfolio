import { Link } from 'react-router-dom';

import './singIn.scss';
import getIconKey from '../../helpers/getImageKey';

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
              img={getIconKey('UserIcon')}
              value={form.email}
              placeholder={'Почта'}
              onChange={formChange}
              error={error}
              id={'email'}
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
            <ForgetLink text={'Забыли пароль?'} type={'link'} />
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
