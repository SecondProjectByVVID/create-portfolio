import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import configApi from './../../config/config.request.json';

export const portfolioAPI = createApi({
  reducerPath: 'portfolioAPI',
  baseQuery: fetchBaseQuery({ baseUrl: configApi.url,credentials: 'include' }),
  tagTypes: ['Portfolio'],
  endpoints: (build) => ({
    getAllPortfolio: build.query({
      query: () => `${configApi.portfolioAll}`,
    }),
    getPortfolioOnId: build.query({
      query: (id) => `${configApi.portfolio}${id}/`,
    }),
    getAllFavorites: build.query({
      query: (id) => `${configApi.favorites}`,
    }),
    getMyProjects: build.query({
      query: () => `${configApi.myProjects}`,
    })
  }),
});
export const { useGetAllPortfolioQuery, useGetPortfolioOnIdQuery,useGetAllFavoritesQuery,useGetMyProjectsQuery } =
  portfolioAPI;
