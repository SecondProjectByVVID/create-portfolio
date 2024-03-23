import UserIcon from './../assets/icons/user-icon.svg';
import PhoneIcon from './../assets/icons/phone-icon.svg';
import PasswordIcon from './../assets/icons/password-icon.svg';
import WorkIcon from './../assets/icons/work-icon.svg';
import AvatarIcon from './../assets/icons/avatar-icon.svg';
import LocationIcon from './../assets/icons/location-icon.svg';
import CreateIcon from './../assets/icons/create-icon.svg';
import ProfileIcon from './../assets/icons/profile-icon.svg';
import ChatIcon from './../assets/icons/chat-icon.svg';
import LogoutIcon from './../assets/icons/logout-icon.svg';
import SearchIcon from './../assets/icons/search-icon.svg';
import SortIcon from './../assets/icons/sort-icon.svg';
import LogoIcon from './../assets/icons/logo-icon.svg';
import TelegramIcon from './../assets/icons/telegram-icon.svg';
import WhatsappIcon from './../assets/icons/whatsapp-icon.svg';
import VkontakteIcon from './../assets/icons/vkontakte-icon.svg';
import ProfileDefaultIcon from './../assets/icons/profileDefault-icon.svg';
import HomeIcon from './../assets/icons/home-icon.svg';
import FavoritesIcon from './../assets/icons/favorites-icon.svg';
import ShareIcon from './../assets/icons/share-icon.svg';
import ContactIcon from './../assets/icons/contact-icon.svg';
import CardDefaultBg from './../assets/background/default-card-bg.jpg';
import AvatarDefaultBg from './../assets/background/default-avatar-bg.webp';

const getIcon = {
  UserIcon,
  PhoneIcon,
  PasswordIcon,
  WorkIcon,
  AvatarIcon,
  LocationIcon,
  CreateIcon,
  ProfileIcon,
  ChatIcon,
  LogoutIcon,
  SearchIcon,
  SortIcon,
  LogoIcon,
  CardDefaultBg,
  TelegramIcon,
  WhatsappIcon,
  VkontakteIcon,
  ProfileDefaultIcon,
  FavoritesIcon,
  HomeIcon,
  ContactIcon,
  ShareIcon
};
const getBg = {
  AvatarDefaultBg
};

export function getIconKey(keyIcon) {
  return getIcon[keyIcon];
}

export function getBgKey(keyBg) {
  return getBg[keyBg];
}
