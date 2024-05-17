import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';

const store = configureStore({
  reducer: {
    userData: userSlice.reducer,
  },
});
export default store;
export type UserDispatch = typeof store.dispatch;
export type UserState = ReturnType<typeof store.getState>;
