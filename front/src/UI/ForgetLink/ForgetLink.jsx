import { Link } from 'react-router-dom';
import './forgetLink.scss';
const ForgetLink = () => {
  return (
    <div className="form__forget-password">
      <Link to="#">Забыли пароль?</Link>
    </div>
  );
};

export default ForgetLink;
