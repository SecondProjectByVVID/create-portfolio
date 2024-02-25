import request from './../service/request.service';
import { localStorageService } from '../service/localStorage.service';
import configApi from './../config/config.request.json';
import getCookie from '../helpers/getCsrfToken';

const csrftoken = getCookie('csrftoken');

const userReq = {
  create: async (postInfo) => {
    try {
      await request.post(configApi.createAndPoint, postInfo);
      return true;
    } catch (error) {
      return error;
    }
  },
  auth: async (postInfo) => {
    try {
      const { data } = await request.post(configApi.authenticateAndPoint, postInfo, {
        headers: {
          'X-CSRFToken': csrftoken
        },
        withCredentials: true
      });
      localStorageService.setIsLogin(true);
      localStorageService.setUserId(data.id);
      return true;
    } catch {
      return false;
    }
  },
  reset: async (resetData) => {
    try {
      await request.post(configApi.reset, resetData);
    } catch (error) {
      console.log(error);
    }
  },
  resetPassword: async (newPassword, uidb64, token) => {
    try {
      await request.post(`${configApi.resetPassword}${uidb64}/${token}`, newPassword);
      return true;
    } catch {
      return false;
    }
  },
  logout: async (token) => {
    try {
      const data = await request.post(
        configApi.logout,
        {},
        {
          headers: {
            'X-CSRFToken': token
          },
          withCredentials: true
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
  get: async () => {
    try {
      const { data } = await request.get(configApi.users);
      return data;
    } catch {
      return false;
    }
  }
};

export default userReq;
