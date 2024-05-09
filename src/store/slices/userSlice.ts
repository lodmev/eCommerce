import { ErrorResponse } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type UserState = {
  isUserAuthorized: boolean;
  isLoading: boolean;
  error: ErrorResponse | null;
};

const initialUserState: UserState = {
  isUserAuthorized: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'userData',
  initialState: initialUserState,
  reducers: {
    setUserLogin: (state) => {
      state.error = null;
      state.isUserAuthorized = true;
    },
    setUserLogout: (state) => {
      state.isUserAuthorized = false;
    },
    setUserIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUserError: (state, action: PayloadAction<ErrorResponse | null>) => {
      state.error = action.payload;
    },
  },
});
export default userSlice;
export const { setUserLogin, setUserLogout, setUserIsLoading, setUserError } = userSlice.actions;
