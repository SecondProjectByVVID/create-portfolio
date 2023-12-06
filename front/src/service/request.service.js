import axios from 'axios';
import { toast } from 'react-toastify';
import configApi from './../config/config.request.json';

const http = axios.create({
  baseURL: configApi.url
});

// http.interceptors.request.use(
//   function (response) {
//     console.log(response);
//     toast.success('Вы успешно зарегистрированы');
//     return response;
//   },
//   function (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

function getResponseText(response) {
  return Object.values(response)[0][0];
}

http.interceptors.response.use(
  function (response) {
    const successRequestsText = getResponseText(JSON.parse(response.request.response));
    toast.success(successRequestsText);
    return response;
  },
  function (error) {
    const textError = getResponseText(error.response.data);
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
