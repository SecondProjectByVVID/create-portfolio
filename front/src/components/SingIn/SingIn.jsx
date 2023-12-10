import { Link } from 'react-router-dom';

import './singIn.scss';
import getIconKey from '../../helpers/getImageKey';

import InputForm from '../../ui/inputForm/InputForm';
import ButtonForm from '../../ui/ButtonForm/ButtonForm';
import ForgetLink from '../../ui/ForgetLink/ForgetLink';
import TitleForm from '../../ui/TitleForm/TitleForm';

import useValidate from '../../hooks/useValidate';
import useForm from '../../hooks/useForm';
import { useSelector } from 'react-redux';
import Loader from './../../ui/Loader/Loader';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import useActions from '../../hooks/useActions';
const SingIn = () => {
  const auth = {
    email: '',
    password: ''
  };
  const { loading } = useSelector((state) => state.signIn);
  const { form, formChange } = useForm(auth);
  const { error } = useValidate(auth);
  const navigate = useNavigate();
  const { login } = useActions();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(form).then(({ payload }) => (payload ? navigate('/') : null));
  };
  return !loading ? (
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
  ) : (
    <Loader />
  );
};

export default SingIn;
