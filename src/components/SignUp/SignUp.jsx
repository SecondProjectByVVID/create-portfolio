import { useState } from 'react';
import { Link } from 'react-router-dom';
import TitleForm from '../../UI/TitleForm/TitleForm';
import InputForm from '../../UI/InputForm/InputForm';
import UserIcon from './../../assets/icons/user-icon.svg';
import PasswordIcon from './../../assets/icons/password-icon.svg';
import useValidate from '../../hooks/useValidate';
import InputFormNoImg from '../../UI/InputForm/InputFormNoImg';
import './SignUp.scss';
import ButtonForm from '../../UI/ButtonForm/ButtonForm';
const SignUp = () => {
  const [reg, setReg] = useState({
    name: '',
    email: '',
    phone: '',
    lastname: '',
    password: ''
  });
  const { validate, error } = useValidate(reg);
  const handleChange = ({ target }) => {
    setReg((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(reg);
    validate();
  };
  return (
    <div className="registr">
      <div className="registr__inner">
        <TitleForm textField={'Регистрация'} />
        <div className="registr__form">
          <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <InputFormNoImg
              value={reg.name}
              type={'text'}
              placeholder={'Имя'}
              onChange={handleChange}
              error={error}
              id={'name'}
            />
            <InputFormNoImg
              value={reg.lastname}
              type={'text'}
              placeholder={'Фамилия'}
              onChange={handleChange}
              error={error}
              id={'lastname'}
            />
            <InputForm
              img={UserIcon}
              value={reg.email}
              type={'email'}
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
              img={UserIcon}
              value={reg.phone}
              placeholder={'Номер телефона'}
              onChange={handleChange}
              error={error}
              id={'phone'}
            />
          </form>
          <div className="reg__sign_up">
            <Link to="/" className="link__sing-up">
              <ButtonForm textField={'Регистрация'} btnClass={'form__sign-up'} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
