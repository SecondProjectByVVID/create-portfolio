const IS_LOGIN_KEY = 'isLoading';
const USER_ID_KEY = 'userId';
const USER_INFO_KEY = 'user';

function setIsLogin(data) {
  localStorage.setItem(IS_LOGIN_KEY, data);
}
function setUserId(data) {
  localStorage.setItem(USER_ID_KEY, data);
}
function setUser(data) {
  localStorage.setItem(USER_INFO_KEY, data);
}

function getIsLogin() {
  return localStorage.getItem(IS_LOGIN_KEY);
}
function getUserId() {
  return localStorage.getItem(USER_ID_KEY);
}
function getUser() {
  return localStorage.getItem(USER_INFO_KEY);
}

function removeAllAuth() {
  localStorage.removeItem(IS_LOGIN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USER_INFO_KEY);
}

export const localStorageService = {
  getIsLogin,
  getUserId,
  getUser,
  setIsLogin,
  setUserId,
  setUser,
  removeAllAuth
};
