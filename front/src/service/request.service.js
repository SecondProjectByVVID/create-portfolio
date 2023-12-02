import axios from 'axios';
import { toast } from 'react-toastify';
import configApi from './../config/config.request.json';

const http = axios.create({
  baseURL: configApi.url
});

http.interceptors.response.use(
  function (response) {
    console.log(response);
    toast.success('Вы успешно зарегистрированы');
    return response;
  },
  function (error) {
    const textError = Object.values(error.response.data)[0][0];
    toast.error(textError);
    return Promise.reject(error);
  }
);

const request = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
};

export default request;
