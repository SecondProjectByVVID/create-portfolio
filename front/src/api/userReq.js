import request from './../service/request.service';
import { localStorageService } from '../service/localStorage.service';
const createAndPoint = 'create_user/';
const authenticateAndPoint = 'authenticate_user/';
const usersAndPoint = 'users/';

const userReq = {
  create: async (postInfo) => {
    try {
      await request.post(createAndPoint, postInfo);
      return true;
    } catch {
      return false;
    }
  },
  auth: async (postInfo) => {
    try {
      const { data } = await request.post(authenticateAndPoint, postInfo);
      localStorageService.setIsLogin(JSON.stringify(true));
      localStorageService.setUser(JSON.stringify(data.data));
      localStorageService.setUserId(JSON.stringify(data.data.id));
      return data.data;
    } catch {
      return false;
    }
  },
  get: async () => {
    try {
      const { data } = await request.get(usersAndPoint);
      return data;
    } catch {
      return false;
    }
  }
};

export default userReq;
