import { Link } from 'react-router-dom'
import './Login.scss'

import UserIcon from './../../assets/icons/user-icon.svg'
import PasswordIcon from './../../assets/icons/password-icon.svg'
import { useState } from 'react'
import InputForm from '../../UI/InputForm/InputForm'

const Login = () => {
  const [auth, setAuth] = useState({
    email: '',
    password: ''
  })
  const handleChange = ({ target }) => {
    setAuth((prevState) => ({ ...prevState, [target.name]: target.value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(auth)
  }
  // useEffect(() => {
  //   console.log(auth)
  // }, [auth])
  return (
    <div className="login">
      <div className="login__inner">
        <h1 className="login__title">Авторизация</h1>
        <div className="login__form">
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <InputForm img={UserIcon} value={auth.email} type={'email'}
              placeholder={'Почта'} onChange={handleChange} />
            <InputForm img={PasswordIcon} value={auth.password} type={'password'}
              placeholder={'Пароль'} onChange={handleChange} />
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
