import request from './../service/request.service';

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
      await request.post(authenticateAndPoint, postInfo);
      return true;
    } catch {
      return false;
    }
  },
  get: async () => {
    try {
      const dataUsers = await request.get(usersAndPoint);
      return dataUsers;
    } catch {
      return false;
    }
  }
};

export default userReq;
