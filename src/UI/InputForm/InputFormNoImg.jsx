import PropTypes from 'prop-types';
import './InputForm.scss';
const InputFormNoImg = ({ value, type, placeholder, onChange, error, id }) => {
  return (
    <div className="form__email">
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
InputFormNoImg.defaultProps = {
  type: 'text'
};
InputFormNoImg.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.object,
  id: PropTypes.string
};
export default InputFormNoImg;
