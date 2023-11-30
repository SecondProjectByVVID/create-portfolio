import PropTypes from 'prop-types';
import './titleForm.scss';
const TitleForm = ({ textField }) => {
  return <h1 className="login__title">{textField}</h1>;
};
TitleForm.propTypes = {
  textField: PropTypes.string
};
export default TitleForm;
