import request from './../service/request.service';

const profileAndPoint = 'profile/';

const profileReq = {
  get: async () => {
    try {
      const { data } = await request.get(profileAndPoint);
      return data;
    } catch (error) {
      return false;
    }
  }
};

export default profileReq;
