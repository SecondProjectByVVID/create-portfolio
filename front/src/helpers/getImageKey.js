import UserIcon from './../assets/icons/user-icon.svg';
import PhoneIcon from './../assets/icons/phone-icon.svg';
import PasswordIcon from './../assets/icons/password-icon.svg';
import WorkIcon from './../assets/icons/work-icon.svg';
import AvatarIcon from './../assets/icons/avatar-icon.svg';
import LocationIcon from './../assets/icons/location-icon.svg';
import CreateIcon from './../assets/icons/create-icon.svg';

const getIcon = {
  UserIcon,
  PhoneIcon,
  PasswordIcon,
  WorkIcon,
  AvatarIcon,
  LocationIcon,
  CreateIcon
};

function getIconKey(keyIcon) {
  return getIcon[keyIcon];
}

export default getIconKey;
