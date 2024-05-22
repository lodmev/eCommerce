import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import productSlice from './slices/productSlice';

const store = configureStore({
  reducer: {
    userData: userSlice.reducer,
    productData: productSlice.reducer,
  },
});
export default store;
export type StoreDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;
