import { useState } from 'react';
import { getIconKey } from '../../helpers/getImageKey';
import useForm from '../../hooks/useForm';
// import userReq from '../../api/userReq';

import TitleForm from '../../UI/TitleForm/TitleForm';
import InputForm from '../../UI/InputForm/InputForm';
import ButtonForm from '../../UI/ButtonForm/ButtonForm';

import './ResetPassword.scss';
import { useNavigate, useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import userReq from '../../api/userReq';

const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [resetPassword] = useState({
    new_password: '',
    uidb64: params.uidb64,
    token: params.token
  });
  const { form, formChange } = useForm(resetPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await userReq.resetPassword(form, params.uidb64, params.token);
    if (response) navigate('/login');
  };
  return (
    <div className="reset">
      <div className="reset__inner">
        <TitleForm textField={'Введите новый пароль'} />
        <form className="reset__form" onSubmit={(e) => handleSubmit(e)}>
          <div className="reset__input">
            <InputForm
              img={getIconKey('PasswordIcon')}
              value={form.new_password}
              type={'password'}
              placeholder={'Введите новый пароль'}
              onChange={formChange}
              id={'new_password'}
            />
          </div>
          <ButtonForm textField={'Отправить'} btnClass={'form__sign-in'} />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
