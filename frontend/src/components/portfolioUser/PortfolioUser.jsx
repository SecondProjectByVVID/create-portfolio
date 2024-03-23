import {
  Link,
  useParams,
} from 'react-router-dom/dist/umd/react-router-dom.development';
import { getBgKey, getIconKey } from '../../helpers/getImageKey';
import { Image } from 'primereact/image';
import Loader from '../../UI/Loader/Loader';
import './PortfolioUser.scss';
import { useFetchInfoProfileQuery } from '../../store/profile/ProfileSlice';
import { useGetPortfolioOnIdQuery } from '../../store/portfolio/PortfolioSlice';
import { useState } from 'react';
import ConfigApi from './../../config/config.request.json';
import { Dialog } from 'primereact/dialog';
import InputForm from '../../UI/InputForm/InputForm';
import useForm from '../../hooks/useForm';
import ButtonForm from '../../UI/ButtonForm/ButtonForm';
import profileReq from '../../api/profileReq';
import ShareDialog from '../shareDialog/ShareDialog';
const PortfolioUser = () => {
  const { id, portfolioId } = useParams();
  const [visible, setVisible] = useState(false);
  const { form, formChange } = useForm({
    user: id,
    email: '',
    description: '',
  });
  const { data, isLoading, isError } = useFetchInfoProfileQuery(id);
  const {
    data: portfolio,
    isLoading: loading,
    isError: error,
  } = useGetPortfolioOnIdQuery(portfolioId);

  if (isLoading || isError || loading || error) {
    return (
      <div className="portfolio__container">
        <Loader />
      </div>
    );
  }
  const handleContactUs = () => {
    setVisible((prevState) => !prevState);
  };
  const contactSubmit = (e) => {
    profileReq.sendContactUs(form);
  };
  return (
    <div className="portfolio__container">
      <div className="user__block">
        <div className="user__connect">
          <img
            src={
              data[0].image ? `${ConfigApi.url}${data[0].image}` : getBgKey('AvatarDefaultBg')
            }
            alt="bg user profile"
            className="user__connect-image"
          />
          <div className="user__connect-btn">
            <Link className="user__connect-tel" to={`tel:${data[0].mobile}`}>
              {data[0].mobile}
            </Link>
            <button className="user__connect-write">Написать</button>
            <button className="user__connect-contact" onClick={handleContactUs}>
              Связаться
            </button>
          </div>
        </div>
        <div className="user__description">
          <Link className="user__all-project">Посмотреть все проекты</Link>
          <h2 className="user__description-title">{`${data[0].first_name} ${data[0].last_name}`}</h2>
          <pre>
            <p className="user__description-text">{data[0].description}</p>
          </pre>
          <p className="user__description-email">
            <span>Почта:</span>
            <Link to="mailto:zvorygin04@inbox.ru">{data[0].email}</Link>
          </p>
          <div className="user__description-links">
            <Link
              className="user__description-link"
              to="https://wa.me/+79515211005"
              target="_blank"
            >
              <img src={getIconKey('WhatsappIcon')} alt="whatsapp icon" />
            </Link>
            <Link
              className="user__description-link"
              to="https://t.me/+79515211005"
              target="_blank"
            >
              <img src={getIconKey('TelegramIcon')} alt="whatsapp icon" />
            </Link>
            <Link className="user__description-link" to="#">
              <img src={getIconKey('VkontakteIcon')} alt="whatsapp icon" />
            </Link>
          </div>
        </div>
      </div>
      <div className="portfolio__block">
        <div className="portfolio__block-list">
          <div className="portfolio__gallery">
            {portfolio.images.map((image, index) => (
              <div className="portfolio__gallery-item" key={index}>
                <Image src={image.image} alt="Image" width="200" preview />
              </div>
            ))}
          </div>
          <div className="portfolio__description">
            <span className="date-message">{portfolio.date_work}</span>
            <h2 className="portfolio__description-title">{portfolio.title}</h2>
            <p className="portfolio__description-text">
              {portfolio.description}
            </p>
          </div>
        </div>
        <ShareDialog/>
      </div>
      <Dialog
        header="Свяжитесь со мной"
        visible={visible}
        style={{ maxWidth: '600px', width: '100%' }}
        onHide={handleContactUs}
        modal
      >
        <InputForm
          img={getIconKey('UserIcon')}
          value={form.email}
          placeholder={'Почта'}
          onChange={formChange}
          id={'email'}
          wi
        />
        <textarea
          id="contact_description"
          className="contact__textarea"
          value={form.description}
          onChange={formChange}
          name="description"
          cols="30"
          rows="7"
          placeholder="Ваше сообщение пользователю"
        ></textarea>
        <ButtonForm
          textField={'Отправить'}
          btnClass={'form__contact'}
          onClick={contactSubmit}
        />
      </Dialog>
    </div>
  );
};

export default PortfolioUser;
