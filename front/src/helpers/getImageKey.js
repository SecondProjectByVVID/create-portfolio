import UserIcon from './../assets/icons/user-icon.svg';
import PhoneIcon from './../assets/icons/phone-icon.svg';
import PasswordIcon from './../assets/icons/password-icon.svg';
import WorkIcon from './../assets/icons/work-icon.svg';

const getIcon = {
  UserIcon,
  PhoneIcon,
  PasswordIcon,
  WorkIcon
};

function getIconKey(keyIcon) {
  return getIcon[keyIcon];
}

export default getIconKey;
