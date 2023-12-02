import * as yup from 'yup';
import { useState } from 'react';

const textErrorField = 'Поле обязательно к заполнению';

const useValidate = (authData) => {
  const [error, setError] = useState({ name: '' });
  const validateScheme = yup.object().shape({
    mobile: yup
      .string()
      .required(textErrorField)
      .matches(
        /^\+?[7][-[\](]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/g,
        'Введите номер в формате: +79000000000'
      ),
    password: yup.string().required(textErrorField).min(6, 'Минимальный размер 6 символов'),
    email: yup.string().required(textErrorField).email('Email введён некорректно'),
    surname: yup.string().required(textErrorField),
    name: yup.string().required(textErrorField)
  });
  const validate = () =>
    validateScheme
      .validate(authData)
      .then((data) => setError({}))
      .catch((data) => setError({ [data.path]: data.message }));
  return { error, validate };
};

export default useValidate;
