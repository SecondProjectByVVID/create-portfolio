import { useCallback, useState } from 'react';

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const formChange = useCallback(({ target }) => {
    setForm((prevState) => ({ ...prevState, [target.name]: target.value }));
  }, []);
  return { formChange, form, setForm };
};

export default useForm;
