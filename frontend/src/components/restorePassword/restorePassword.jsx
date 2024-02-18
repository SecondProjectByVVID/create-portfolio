import { useState } from 'react';

import TitleForm from '../../UI/TitleForm/TitleForm';
import InputForm from '../../UI/InputForm/InputForm';
import ButtonForm from '../../UI/ButtonForm/ButtonForm';

import './restorePassword.scss';
import useForm from '../../hooks/useForm';
import { getIconKey } from '../../helpers/getImageKey';
import ForgetLink from '../../UI/ForgetLink/ForgetLink';

const RestorePassword = () => {
  const [restoreForm] = useState({ email: '' });
  const { form, formChange } = useForm(restoreForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };
  return (
    <div className="restore">
      <div className="registr__inner">
        <TitleForm textField={'Забыли пароль?'} />
        <form className="restore__form" onSubmit={(e) => handleSubmit(e)}>
          <div className="restore__input">
            <InputForm
              img={getIconKey('UserIcon')}
              value={form.email}
              type={'text'}
              placeholder={'Почта'}
              onChange={formChange}
              id={'email'}
            />
          </div>
          <ForgetLink text={'Вернуться назад'} type={'nav'} />
          <ButtonForm textField={'Восстановить'} btnClass={'form__sign-in'} />
        </form>
      </div>
    </div>
  );
};

export default RestorePassword;