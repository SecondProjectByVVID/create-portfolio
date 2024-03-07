import PropTypes from 'prop-types';
import './InputForm.scss';

const InputForm = ({
  img,
  value,
  type,
  placeholder,
  onChange,
  error,
  id,
  inputClass,
}) => {
  return (
    <div className="form__email">
      {img ? <img src={img} className="form__email-icon" /> : ''}
      <input
        className={
          (error[id] ? 'error ' : '') +
          (img ? 'form__email-input ' : 'form__email-input form__no-image ') +
          inputClass
        }
        value={value}
        onChange={(e) => onChange(e)}
        type={type}
        placeholder={placeholder}
        name={id}
      />
      {/* Error text message  */}
      {error ? <p className="error__message">{error}</p> : ''}
    </div>
  );
};
InputForm.defaultProps = {
  type: 'text',
  img: '',
  error: '',
  inputClass: '',
};
InputForm.propTypes = {
  img: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  id: PropTypes.string,
  inputClass: PropTypes.string,
};

export default InputForm;
