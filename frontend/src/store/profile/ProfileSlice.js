import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import configApi from './../../config/config.request.json';

export const profileAPI = createApi({
  reducerPath: 'profileAPI',
  baseQuery: fetchBaseQuery({ baseUrl: configApi.url }),
  tagTypes: ['Profile'],
  endpoints: (build) => ({
    fetchInfoProfile: build.query({
      query: (id) => `${configApi.profile}${id}/`,
      providesTags: ['Profile'],
    }),
  }),
});
export const { useFetchInfoProfileQuery } = profileAPI;
