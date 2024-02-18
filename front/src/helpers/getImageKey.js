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

import CardDefaultBg from './../assets/background/default-card-bg.jpg';

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
  CardDefaultBg
};

function getIconKey(keyIcon) {
  return getIcon[keyIcon];
}

export default getIconKey;
