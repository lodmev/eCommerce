import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import productSlice from './slices/productSlice';
import basketSlice from './slices/basketSlice';

const store = configureStore({
  reducer: {
    userData: userSlice.reducer,
    productData: productSlice.reducer,
    basketData: basketSlice.reducer,
  },
});
export default store;
export type StoreDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;
