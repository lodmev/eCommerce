import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import productListSlice from './slices/productListSlice';

const store = configureStore({
  reducer: {
    userData: userSlice.reducer,
    productList: productListSlice.reducer,
  },
});
export default store;
export type StoreDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;
