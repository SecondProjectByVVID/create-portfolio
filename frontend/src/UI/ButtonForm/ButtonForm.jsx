import PropTypes from 'prop-types';

import './ButtonForm.scss';

const ButtonForm = ({ textField, btnClass, onClick }) => {
  return (
    <button className={btnClass} type="submit" onClick={onClick}>
      {textField}
    </button>
  );
};

ButtonForm.defaultProps = {
  onClick: () => {},
};
ButtonForm.propTypes = {
  textField: PropTypes.string,
  btnClass: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonForm;
