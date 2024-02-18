import { Link } from 'react-router-dom/dist/umd/react-router-dom.development';
import { getBgKey, getIconKey } from '../../helpers/getImageKey';
import { Image } from 'primereact/image';

import './PortfolioUser.scss';
const PortfolioUser = () => {
  return (
    <div className="portfolio__container">
      <div className="user__block">
        <div className="user__connect">
          <img
            src={getBgKey('CardDefaultBg')}
            alt="bg user profile"
            className="user__connect-image"
          />
          <div className="user__connect-btn">
            <Link className="user__connect-tel" to="tel:+78005553535">
              8(800)-555-35-35
            </Link>
            <button className="user__connect-write">Написать</button>
          </div>
        </div>
        <div className="user__description">
          <h2 className="user__description-title">Саша Кавасаки</h2>
          <p className="user__description-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore suscipit sed eveniet
            nemo, distinctio sapiente veritatis reiciendis aliquid in perferendis! Voluptas
            repellendus similique quod qui iste consequatur ex sint assumenda?
          </p>
          <p className="user__description-email">
            <span>Почта:</span>
            <Link to="mailto:zvorygin04@inbox.ru">zvorygin04@inbox.ru</Link>
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
          </div>
          <div className="portfolio__description">
            <h2 className="portfolio__description-title">Котельная</h2>
            <p className="portfolio__description-text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id rerum odit, facilis
              placeat fuga veniam iste consequuntur nulla quae tempore at saepe qui sint repellat a
              atque minima? Deleniti, incidunt. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Accusantium ratione pariatur expedita ad excepturi fugit culpa est porro maiores
              cumque, optio rerum. Amet quam quod, omnis doloremque aperiam porro placeat. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptatum perspiciatis,
              laudantium dolorem, architecto in, earum voluptatibus blanditiis tempore expedita
              laboriosam iure error magni facilis velit. Vero amet saepe voluptates! Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Perspiciatis aut asperiores pariatur
              saepe, modi culpa adipisci sint, deserunt rem commodi quis delectus nulla iure cumque
              praesentium fugit distinctio maxime officia? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Ad incidunt fuga repellat harum cum quas cumque deserunt eaque
              rerum. Reprehenderit totam perspiciatis sit repellat sapiente nulla, neque cumque
              impedit exercitationem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
              corporis, fugiat quas numquam dolorum laudantium cupiditate suscipit iste harum porro
              architecto, vitae dignissimos quis eius libero. Magni beatae sit molestiae. Lorem
              ipsum dolor, sit amet consectetur adipisicing elit. Iusto blanditiis voluptate rerum
              molestias consequatur vel, si
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioUser;
