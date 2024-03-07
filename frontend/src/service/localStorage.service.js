const IS_LOGIN_KEY = 'isLogin';
const USER_ID_KEY = 'userId';
const isCaptcha = false;

function setIsLogin(data) {
  localStorage.setItem(IS_LOGIN_KEY, JSON.stringify(data));
}
function setUserId(data) {
  localStorage.setItem(USER_ID_KEY, JSON.stringify(data));
}
function setCaptcha(data) {
  localStorage.setItem(isCaptcha, JSON.stringify(data));
}

function getIsLogin() {
  return JSON.parse(localStorage.getItem(IS_LOGIN_KEY));
}
function getUserId() {
  return JSON.parse(localStorage.getItem(USER_ID_KEY));
}
function getCaptcha() {
  return JSON.parse(localStorage.getItem(isCaptcha));
}
function removeAllAuth() {
  localStorage.removeItem(IS_LOGIN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(isCaptcha);
}

export const localStorageService = {
  getIsLogin,
  getUserId,
  getCaptcha,
  setIsLogin,
  setUserId,
  setCaptcha,
  removeAllAuth,
};
