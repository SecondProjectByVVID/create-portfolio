import { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { localStorageService } from '../../service/localStorage.service';
import InputForm from '../../UI/InputForm/InputForm';

import styles from './CreatePortfolio.module.scss';
import MyFileUpload from './MyFileUpload';

const CreatePortfolio = () => {
  const [create, setCreate] = useState({
    user: localStorageService.getUserId(),
    title: '',
    description: '',
    images: [],
    date_work: null
  });

  const createChange = ({ target }) => {
    setCreate((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const cancelCreate = () => {};
  const createForm = (e) => {
    e.preventDefault();
    console.log(create);
  };
  return (
    <div className={styles.create__portfolio}>
      <form className="create__form" onSubmit={createForm}>
        <div className={styles['create__portfolio-top']}>
          <div className={styles.create__images}>
            <MyFileUpload />
          </div>
          <div className={styles['create__top-info']}>
            <InputForm
              value={create.title}
              placeholder={'Название проекта'}
              onChange={createChange}
              id={'title'}
              inputClass={styles.create__input}
            />
            <Calendar
              id="buttondisplay"
              className={styles.calendar}
              value={create.date_work}
              onChange={(e) => setCreate((prevState) => ({ ...prevState, date_work: e.value }))}
              showIcon
            />
          </div>
        </div>
        <div className={styles.create__description}>
          <h2 className={styles['create__description-title']}>Описание</h2>
          <div className={styles.create__content}>
            <textarea
              className={styles.create__textarea}
              name="description"
              id="create-description"
              cols="30"
              rows="10"
              value={create.description}
              onChange={createChange}
              placeholder="Добавьте описание о вашем проекте"></textarea>
            <div className={styles['create__description-btns']}>
              <button className={styles['create__btn-save']} type="submit">
                Сохранить
              </button>
              <button className={styles['create__btn-cancel']} type="button" onClick={cancelCreate}>
                Отменить
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePortfolio;
