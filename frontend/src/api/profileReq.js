import request from './../service/request.service';
import ConfigApi from './../config/config.request.json';

const profileReq = {
  updateProfile: async (id, profile) => {
    try {
      const { data } = await request.patch(`${ConfigApi.profile}${id}/`, profile);
      console.log(data);
      return data;
    } catch (error) {
      return false;
    }
  }
};

export default profileReq;
