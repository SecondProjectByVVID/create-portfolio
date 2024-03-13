import request from './../service/request.service';
import ConfigApi from './../config/config.request.json';

const profileReq = {
  getUserProfile: async (id) => {
    try {
      const { data } = await request.get(`${ConfigApi.profile}/${id}`);
      return data;
    } catch (error) {
      return false;
    }
  }
};

export default profileReq;
