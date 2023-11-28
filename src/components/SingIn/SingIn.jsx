import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'

import './SingIn.scss'
import UserIcon from './../../assets/icons/user-icon.svg'
import PasswordIcon from './../../assets/icons/password-icon.svg'

import InputForm from '../../UI/InputForm/InputForm'
import ButtonForm from '../../UI/ButtonForm/ButtonForm'
import ForgetLink from '../../UI/ForgetLink/ForgetLink'
import TitleForm from '../../UI/TitleForm/TitleForm'
import * as yup from 'yup'

const SingIn = () => {
  const [auth, setAuth] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState({})
  const validateScheme = yup.object().shape({
    password: yup.string().required('Пароль обязателен к заполнению').min(6, 'Минимальный размер 6 символов'),
    email: yup.string().required('Электронная почта обязательна к заполнению').email('Email введён некорректно')
  })
  const handleChange = ({ target }) => {
    setAuth((prevState) => ({ ...prevState, [target.name]: target.value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(auth)
    validateScheme.validate(auth).then((data) => setError({})).catch((data) => setError({ [data.path]: data.message }))
    toast.success('Successful submit form', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: 'dark'
    })
  }
  return (
    <div className="login">
      <div className="login__inner">
        <TitleForm textField={'Авторизация'} />
        <div className="login__form">
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <InputForm img={UserIcon} value={auth.email} placeholder={'Почта'}
              onChange={handleChange} error={error} id={'email'}/>
            <InputForm img={PasswordIcon} value={auth.password} type={'password'}
              placeholder={'Пароль'} onChange={handleChange} error={ error } id={'password'}/>
              <ForgetLink/>
                <ButtonForm textField={'Войти'} btnClass={'form__sign-in'}/>
                <div className="form__create-acc">
                    <p>
                      Нет аккаунта?
                    </p>
            </div>
            <Link to='/signUp' className='link__sing-up'>
              <ButtonForm textField={'Регистрация'} btnClass={'form__sign-up'} />
            </Link>
            </form>
        </div>
      </div>
     </div>
  )
}

export default SingIn
