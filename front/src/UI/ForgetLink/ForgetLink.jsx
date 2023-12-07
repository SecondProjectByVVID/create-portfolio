import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ForgetLink.scss';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
const ForgetLink = ({ text, type }) => {
  const navigate = useNavigate();
  return (
    <div className="form__forget-password">
      {type === 'nav' ? (
        <span onClick={() => navigate(-1)}>{text}</span>
      ) : (
        <Link to="/restore">
          <span>{text}</span>
        </Link>
      )}
    </div>
  );
};

ForgetLink.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string
};

export default ForgetLink;
