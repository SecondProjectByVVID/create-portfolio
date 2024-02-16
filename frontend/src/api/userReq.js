import request from './../service/request.service';
import { localStorageService } from '../service/localStorage.service';
import configApi from './../config/config.request.json';

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
      const { data } = await request.post(configApi.authenticateAndPoint, postInfo);
      localStorageService.setIsLogin(true);
      localStorageService.setUserId(data.id);
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
