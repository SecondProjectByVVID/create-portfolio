import { useState } from 'react';

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const formChange = ({ target }) => {
    setForm((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  return { formChange, form };
};

export default useForm;
