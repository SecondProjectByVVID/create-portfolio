import PropTypes from 'prop-types';

import './buttonForm.scss';

const ButtonForm = ({ textField, btnClass }) => {
  return (
    <button className={btnClass} type="submit">
      {textField}
    </button>
  );
};

ButtonForm.propTypes = {
  textField: PropTypes.string,
  btnClass: PropTypes.string
};

export default ButtonForm;
