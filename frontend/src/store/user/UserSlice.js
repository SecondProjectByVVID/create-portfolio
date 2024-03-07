import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import configApi from './../../config/config.request.json';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: configApi.url }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    fetchInfoUser: build.query({
      query: (id) => `${configApi.userMenu}${id}/`,
      providesTags: ['User'],
    }),
    fetchContactUs: build.query({
      query: (id) => `${configApi.contactUs}${id}/`,
      providesTags: ['User'],
    }),
  }),
});
export const { useFetchInfoUserQuery, useFetchContactUsQuery } = userAPI;
