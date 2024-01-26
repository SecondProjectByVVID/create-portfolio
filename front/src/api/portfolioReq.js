import request from './../service/request.service';

const portfolioAndPoint = 'portfolio/';

const portfolio = {
  get: async () => {
    try {
      const { data } = await request.get(portfolioAndPoint);
      return data;
    } catch {
      return false;
    }
  }
};

export default portfolio;
