import request from './../service/request.service';
import ConfigApi from './../config/config.request.json';
import getCookie from '../helpers/getCsrfToken';

const csrftoken = getCookie('csrftoken');

const portfolio = {
  createPortfolio: async (newPortfolio) => {
    try {
      const { data } = await request.post(
        `${ConfigApi.portfolio}`,
        newPortfolio,
        {
          headers: {
            'X-CSRFToken': csrftoken,
          },
          withCredentials: true,
        },
      );
      return data;
    } catch (error) {
      return false;
    }
  },
  deletePortfolio: async (id) => {
    try {
      const { data } = await request.delete(`${ConfigApi.myProjects}${id}/`, {
        headers: {
          'X-CSRFToken': csrftoken,
        },
        withCredentials: true,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
};

export default portfolio;
