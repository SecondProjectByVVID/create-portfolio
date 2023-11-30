import PropTypes from 'prop-types';
import './InputForm.scss';

const InputForm = ({ img, value, type, placeholder, onChange, error, id }) => {
  return (
    <div className="form__email">
      <img src={img} className="form__email-icon" />
      <input
        className={(error[id] ? 'error ' : '') + 'form__email-input'}
        value={value}
        onChange={(e) => onChange(e)}
        type={type}
        placeholder={placeholder}
        name={id}
      />
      {/* Error text message  */}
      {error[id] ? <p className="error__message">{error[id]}</p> : ''}
    </div>
  );
};
InputForm.defaultProps = {
  type: 'text'
};
InputForm.propTypes = {
  img: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.object,
  id: PropTypes.string
};

export default InputForm;
