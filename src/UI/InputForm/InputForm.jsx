import PropTypes from 'prop-types'
import './InputForm.scss'

const InputForm = ({ img, value, type, placeholder, onChange }) => {
  return <div className="form__email">
        <img src={img} className="form__email-icon"/>
    <input className='form__email-input'
      value={value}
      onChange={(e) => onChange(e)}
      type={type} placeholder={placeholder} name={type } />
  </div>
}

InputForm.propTypes = {
  img: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}

export default InputForm
