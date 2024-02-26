import { Link, useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import { getBgKey, getIconKey } from '../../helpers/getImageKey';
import { Image } from 'primereact/image';
import Loader from '../../UI/Loader/Loader';
import './PortfolioUser.scss';
import { useFetchInfoProfileQuery } from '../../store/profile/ProfileSlice';
import { useGetPortfolioOnIdQuery } from '../../store/portfolio/PortfolioSlice';
import { Message } from 'primereact/message';
import { useState } from 'react';
const PortfolioUser = () => {
  const [open, setOpen] = useState(false);
  const { id, portfolioId } = useParams();
  const { data, isLoading, isError } = useFetchInfoProfileQuery(id);
  const {
    data: portfolio,
    isLoading: loading,
    isError: error
  } = useGetPortfolioOnIdQuery(portfolioId);

  if (isLoading || isError || loading || error) {
    return (
      <div className="portfolio__container">
        <Loader />
      </div>
    );
  }
  const handleDateMessage = () => {
    setOpen((prevState) => !prevState);
  };
  return (
    <div className="portfolio__container">
      <div className="user__block">
        <div className="user__connect">
          <img
            src={`http://localhost:3000${data[0].image}` ?? getBgKey('CardDefaultBg')}
            alt="bg user profile"
            className="user__connect-image"
          />
          <div className="user__connect-btn">
            <Link className="user__connect-tel" to={`tel:${data[0].mobile}`}>
              {data[0].mobile}
            </Link>
            <button className="user__connect-write">Написать</button>
          </div>
        </div>
        <div className="user__description">
          <h2 className="user__description-title">{`${data[0].first_name} ${data[0].last_name}`}</h2>
          <p className="user__description-text">{data[0].description}</p>
          <p className="user__description-email">
            <span>Почта:</span>
            <Link to="mailto:zvorygin04@inbox.ru">{data[0].email}</Link>
          </p>
          <div className="user__description-links">
            <Link
              className="user__description-link"
              to="https://wa.me/+79515211005"
              target="_blank">
              <img src={getIconKey('WhatsappIcon')} alt="whatsapp icon" />
            </Link>
            <Link className="user__description-link" to="https://t.me/+79515211005" target="_blank">
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
            <div className="portfolio__gallery-item">
              <Image
                src="https://primefaces.org/cdn/primereact/images/galleria/galleria10.jpg"
                alt="Image"
                width="220"
                preview
              />
            </div>
            <div className="portfolio__gallery-item">
              <Image
                src="https://primefaces.org/cdn/primereact/images/galleria/galleria10.jpg"
                alt="Image"
                width="220"
                preview
              />
            </div>
            <div className="portfolio__gallery-item">
              <Image
                src="https://primefaces.org/cdn/primereact/images/galleria/galleria10.jpg"
                alt="Image"
                width="220"
                preview
              />
            </div>
            <div className="portfolio__gallery-item">
              <Image
                src="https://primefaces.org/cdn/primereact/images/galleria/galleria10.jpg"
                alt="Image"
                width="220"
                preview
              />
            </div>
            <div className="portfolio__gallery-item">
              <Image
                src="https://primefaces.org/cdn/primereact/images/galleria/galleria10.jpg"
                alt="Image"
                width="220"
                preview
              />
            </div>
            <div className="portfolio__gallery-item">
              <Image
                src="https://primefaces.org/cdn/primereact/images/galleria/galleria10.jpg"
                alt="Image"
                width="220"
                preview
              />
            </div>
            <div className="portfolio__gallery-item">
              <Image
                src="https://primefaces.org/cdn/primereact/images/galleria/galleria10.jpg"
                alt="Image"
                width="220"
                preview
              />
            </div>
          </div>
          <div className="portfolio__description">
            <img
              src={getIconKey('CalendarIcon')}
              alt="calendar icon portfolio"
              className="portfolio__date-work"
              onClick={handleDateMessage}
            />
            <Message
              severity="info"
              text={`Проект выполнен ${portfolio.date_work}`}
              className={open ? 'date-message date-message--open' : 'date-message'}
            />
            <h2 className="portfolio__description-title">{portfolio.title}</h2>
            <p className="portfolio__description-text">{portfolio.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioUser;
