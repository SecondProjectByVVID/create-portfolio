import { Link } from 'react-router-dom';
import styles from './ActiveEmail.module.scss';
import Check from './../../assets/icons/check-active.svg';
import { useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
const ActiveEmail = () => {
  const { message } = useParams();
  return (
    <div className={styles.active__container}>
      <div className={styles.active__block}>
        <h1 className={styles['active__email-title']}>{message}</h1>
        <img src={Check} alt="check active email" />
        <Link to="/login" className={styles.active__login}>
          Войти
        </Link>
      </div>
    </div>
  );
};

export default ActiveEmail;
