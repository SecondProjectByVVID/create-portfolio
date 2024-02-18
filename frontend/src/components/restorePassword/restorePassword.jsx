import { useState } from 'react';
import { getIconKey } from '../../helpers/getImageKey';
import useForm from '../../hooks/useForm';
import ReCAPTCHA from 'react-google-recaptcha';
import userReq from '../../api/userReq';

import apiConfig from './../../config/config.request.json';

import TitleForm from '../../UI/TitleForm/TitleForm';
import InputForm from '../../UI/InputForm/InputForm';
import ButtonForm from '../../UI/ButtonForm/ButtonForm';
import ForgetLink from '../../UI/ForgetLink/ForgetLink';

import './restorePassword.scss';

const RestorePassword = () => {
  const [restoreForm] = useState({ email: '' });
  const { form, formChange, setForm } = useForm(restoreForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    userReq.reset(form);
  };
  const captchaChange = (e) => {
    setForm((prevState) => ({ ...prevState, g_recaptcha_response: e }));
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
          <ReCAPTCHA
            sitekey={apiConfig.keyCaptcha}
            onChange={captchaChange}
            name="g-recaptcha-response"
          />
        </form>
      </div>
    </div>
  );
};

export default RestorePassword;
