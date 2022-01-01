import {createSlice} from '@reduxjs/toolkit';
import {CurrentUserStoreType} from './types';

export const initialState: CurrentUserStoreType = {
  data: null,
  status: null,
};
export const sliceKey = 'currentUser';
const signInSlice = createSlice({
  name: sliceKey,
  initialState,
  reducers: {
    signIn(state) {
      state.status = 'pending';
    },
    setUserInfo(state, {payload: {data}}) {
      state.status = 'success';
      state.data = data;
    },
  },
});

export const {signIn, setUserInfo} = signInSlice.actions;
export default signInSlice.reducer;
