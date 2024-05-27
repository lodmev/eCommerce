import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { logoutUser } from '../../api/customers';

type UserState = {
  isUserAuthorized: boolean;
  isLoading: boolean;
  errorMsg: string;
  userVersion: number;
};

const initialUserState: UserState = {
  isUserAuthorized: Boolean(window.sessionStorage.getItem('token')),
  isLoading: false,
  errorMsg: '',
  userVersion: 1,
};

const userSlice = createSlice({
  name: 'userData',
  initialState: initialUserState,
  reducers: {
    setUserLogin: (state) => {
      state.errorMsg = '';
      state.isUserAuthorized = true;
    },
    setUserLogout: (state) => {
      logoutUser();
      state.isUserAuthorized = false;
    },
    setUserIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUserError: (state, action: PayloadAction<string>) => {
      state.errorMsg = action.payload;
    },
    setUserVersion: (state, action: PayloadAction<number>) => {
      state.userVersion = action.payload;
    },
  },
});
export default userSlice;
export const { setUserLogin, setUserVersion, setUserLogout, setUserIsLoading, setUserError } =
  userSlice.actions;
