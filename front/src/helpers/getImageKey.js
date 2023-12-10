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
  LogoutIcon
};

function getIconKey(keyIcon) {
  return getIcon[keyIcon];
}

export default getIconKey;
