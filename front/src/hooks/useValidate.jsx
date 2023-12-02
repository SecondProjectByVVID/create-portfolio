import * as yup from 'yup';
import { useState } from 'react';

const textErrorField = 'Поле обязательно к заполнению';

const useValidate = (authData) => {
  const [error, setError] = useState({});
  const validateScheme = yup.object().shape({
    password: yup.string().required(textErrorField).min(6, 'Минимальный размер 6 символов'),
    email: yup.string().required(textErrorField).email('Email введён некорректно'),
    name: yup
      .string()
      .required(textErrorField)
      .matches(/^[a-zA-Z\s]+$/),
    surname: yup
      .string()
      .required(textErrorField)
      .matches(/^[a-zA-Z\s]+$/),
    phoneNumber: yup.number().matches(/(?:\+|\d)[\d\-[\]([\]) ]{9,}\d/g)
  });
  const validate = () =>
    validateScheme
      .validate(authData)
      .then((data) => setError({}))
      .catch((data) => setError({ [data.path]: data.message }));
  return { error, validate };
};

export default useValidate;
