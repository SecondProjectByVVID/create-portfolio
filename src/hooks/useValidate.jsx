import * as yup from 'yup'
import { useState } from 'react'

const useValidate = (authData) => {
  const [error, setError] = useState({})
  const validateScheme = yup.object().shape({
    password: yup.string().required('Пароль обязателен к заполнению').min(6, 'Минимальный размер 6 символов'),
    email: yup.string().required('Электронная почта обязательна к заполнению').email('Email введён некорректно'),
    name: yup.string().min(3)
  })
  const validate = () => validateScheme.validate(authData)
    .then((data) => setError({}))
    .catch((data) => setError({ [data.path]: data.message }))
  return { error, validate }
}

export default useValidate
