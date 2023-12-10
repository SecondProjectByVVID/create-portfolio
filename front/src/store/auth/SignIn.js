import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userReq from '../../api/userReq';
import { localStorageService } from '../../service/localStorage.service';

const user = JSON.parse(localStorageService.getUser()) || {};
const isLogin = JSON.parse(localStorageService.getIsLogin()) || false;

export const login = createAsyncThunk('auth/login', (form) => {
  const response = userReq.auth(form);
  return response;
});

const initialState = {
  isLogin,
  user,
  loading: false
};

const signInSlice = createSlice({
  name: 'singIn',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          state.user = { ...state.user, ...payload };
          state.isLogin = true;
        }
      });
  }
});
export default signInSlice.reducer;
