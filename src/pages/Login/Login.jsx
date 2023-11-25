import { Link } from 'react-router-dom'
import './Login.scss'

import UserIcon from './../../assets/icons/user-icon.svg'
import PasswordIcon from './../../assets/icons/password-icon.svg'

const Login = () => {
  return (
    <div className="login">
      <div className="login__inner">
        <h1 className="login__title">Авторизация</h1>
        <div className="login__form">
            <form className="form">
                <div className="form__email">
                    <img src={UserIcon} className="form__email-icon"/>
                    <input className='form__email-input' type="email" placeholder="Почта" name='email'/>
                </div>
                <div className="form__password">
                    <img src={PasswordIcon} className="form__password-icon"/>
                    <input className='form__password-input' type="password" placeholder="Пароль" name='password'/>
                </div>
                <div className="form__forget-password">
                      <Link to="#">Забыли пароль?</Link>
                </div>
                <button className="form__sign-in" type='submit'>
                  Войти
                </button>
                <div className="form__create-acc">
                    <p>
                      Нет аккаунта?
                    </p>
            </div>
            <Link to='#' className="form__sign-up">
              Регистрация
              </Link>
            </form>
        </div>
      </div>
     </div>
  )
}

export default Login
