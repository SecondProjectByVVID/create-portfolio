import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userReq from '../../api/userReq';

const initialState = {
  loading: false
};

export const registry = createAsyncThunk('auth/registry', (form) => {
  userReq.create(form);
});

const singUpSLice = createSlice({
  name: 'singUp',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(registry.fulfilled, (state, { payload }) => {});
  }
});

export default singUpSLice.reducer;
