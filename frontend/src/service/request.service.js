import axios from 'axios';
import { toast } from 'react-toastify';
import configApi from './../config/config.request.json';
import { localStorageService } from './localStorage.service';

function handlerCaptchaError({ data }) {
  const countCaptchaError = data?.failed_attempts;
  if (countCaptchaError >= 3) localStorageService.setCaptcha(true);
}

const http = axios.create({
  baseURL: configApi.url,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken'
});
http.interceptors.request.use(
  function (request) {
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);
http.interceptors.response.use(
  function (response) {
    const { message } = response.data;
    toast.success(message);
    return response;
  },
  function (error) {
    console.log(error);
    handlerCaptchaError(error.response);
    const otherMessage = Object.values(error.response.data);
    const { message } = error.response.data;
    toast.error(message || otherMessage[0][0]);
    return Promise.reject(error);
  }
);

const request = {
  get: http.get,
  post: http.post,
  put: http.put,
  patch: http.patch,
  delete: http.delete
};

export default request;
