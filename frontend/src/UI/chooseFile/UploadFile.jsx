import styles from './UploadFile.module.scss';
import PropTypes from 'prop-types';
import { getIconKey } from '../../helpers/getImageKey';
const UploadFile = ({ accept, withExtendedField, extendedText, id, image, setImage }) => {
  const uploadImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      // console.log(reader.result);
    };
    if (file) reader.readAsDataURL(file);
    else setImage(null);
  };
  return (
    <div className={`${styles['group__upload-file']}`}>
      {withExtendedField && (
        <label htmlFor={id} className={styles.upload__container}>
          <img
            className={styles['upload-image__default']}
            src={getIconKey('ProfileDefaultIcon')}
            alt="default bg profile"
          />
          <span className={styles.upload__title}>{extendedText}</span>
        </label>
      )}
      <input
        className={
          withExtendedField
            ? `${styles['input__upload-file']} ${styles['input__upload-extended']}`
            : `${styles['input__upload-file']}`
        }
        type="file"
        id={id}
        accept={accept}
        onChange={uploadImage}
      />
      {image && <img className={styles['upload__image-bg']} src={image} alt="Uploaded" />}
    </div>
  );
};

UploadFile.defaultProps = {
  withExtendedField: false,
  extendedText: '',
  accept: 'image/*'
};
UploadFile.propTypes = {
  accept: PropTypes.string,
  id: PropTypes.string,
  extendedText: PropTypes.string,
  withExtendedField: PropTypes.bool,
  image: PropTypes.string,
  setImage: PropTypes.func
};
export default UploadFile;
