import request from './../service/request.service';
import ConfigApi from './../config/config.request.json';
import getCookie from '../helpers/getCsrfToken';

const csrftoken = getCookie('csrftoken');

const profileReq = {
  updateProfile: async (id, profile) => {
    try {
      const { data } = await request.patch(`${ConfigApi.profile}${id}/`, profile, {
        headers: {
          'X-CSRFToken': csrftoken,
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      console.log(data);
      return data;
    } catch (error) {
      return false;
    }
  },
  sendContactUs: async (contact) => {
    try {
      const { data } = await request.post(`${ConfigApi.contactUs}`, contact, {
        headers: {
          'X-CSRFToken': csrftoken
        },
        withCredentials: true
      });
      console.log(data);
      return data;
    } catch (error) {
      return false;
    }
  }
};

export default profileReq;
