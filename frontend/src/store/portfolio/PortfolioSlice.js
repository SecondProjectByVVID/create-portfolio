import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import configApi from './../../config/config.request.json';

export const portfolioAPI = createApi({
  reducerPath: 'portfolioAPI',
  baseQuery: fetchBaseQuery({ baseUrl: configApi.url }),
  tagTypes: ['Portfolio'],
  endpoints: (build) => ({
    getAllPortfolio: build.query({
      query: () => `${configApi.portfolio}`,
      providesTags: ['Portfolio']
    })
  })
});
export const { useGetAllPortfolioQuery } = portfolioAPI;
