import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './ShareDialog.scss'
import { toast } from 'react-toastify';
import { getIconKey } from '../../helpers/getImageKey';
const ShareDialog = () => {
  const [visible, setVisible] = useState(false);

 const handleShare = () => {
    setVisible(prevState => !prevState);
  };
  const shareVk = () => {
    try {
      const url = `https://vk.com/share.php?url=${window.location.href}`
      window.open(url)
    } catch (error) {
      toast.error(error)
    }
  }
  const shareTelegram = () => {
    try {
      const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}`
      window.open(url)
    } catch (error) {
      toast.error(error)
    }
  }
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Техт успешно скопирован')
    } catch (err) {
      toast.error(err);
    }
  }
  const footer = (
    <div className='share__copy'>
      <input className='share__copy-input' type="text" value={window.location.href} disabled={ true } />
      <button className="share__copy-btn" onClick={copyLink}>Копировать</button>
    </div>
  );
  return (
    <>
      <div className="portfolio__share" onClick={handleShare}>
          <svg width="40" height="42" viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M45.6 0.449951H0.75V45.2999H45.6V0.449951Z" fill="white" fill-opacity="0.01"/>
            <path d="M33.4531 15.3999C36.0333 15.3999 38.125 13.3082 38.125 10.728C38.125 8.14783 36.0333 6.05615 33.4531 6.05615C30.8729 6.05615 28.7812 8.14783 28.7812 10.728C28.7812 13.3082 30.8729 15.3999 33.4531 15.3999Z" fill="white" stroke="black" stroke-width="1.92" stroke-linejoin="round"/>
            <path d="M12.8965 27.5469C15.4767 27.5469 17.5684 25.4552 17.5684 22.875C17.5684 20.2948 15.4767 18.2031 12.8965 18.2031C10.3163 18.2031 8.22461 20.2948 8.22461 22.875C8.22461 25.4552 10.3163 27.5469 12.8965 27.5469Z" fill="white" stroke="black" stroke-width="1.92" stroke-linejoin="round"/>
            <path d="M28.7814 13.1335L16.9512 20.301" stroke="black" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.9512 25.2705L29.4161 32.6362" stroke="black" stroke-width="1.92" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M33.4531 30.3499C36.0333 30.3499 38.125 32.4415 38.125 35.0217C38.125 37.6019 36.0333 39.6936 33.4531 39.6936C30.8729 39.6936 28.7812 37.6019 28.7812 35.0217C28.7812 32.4415 30.8729 30.3499 33.4531 30.3499Z" fill="white" stroke="black" stroke-width="1.92" stroke-linejoin="round"/>
          </svg>
        </div>
      <Dialog
        visible={visible}
        draggable={false}
        onHide={handleShare}
        baseZIndex={10000}
        style={{ width: '400px'}}
        footer={footer}
        header="Поделиться"
      >
        <ul className="share__list">
          <li className="share__list-item" onClick={shareVk}>
            <img src={getIconKey('VkontakteIcon')} alt="vkontakte icon" />
          </li>
          <li className="share__list-item" onClick={shareTelegram}>
            <img src={getIconKey('TelegramIcon')} alt="vkontakte icon" />
          </li>
          <li className="share__list-item">
            <img src={getIconKey('WhatsappIcon')} alt="vkontakte icon" />
          </li>
        </ul>
      </Dialog>
    </>
  )
}

export default ShareDialog