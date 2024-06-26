import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { logoutUser } from '../../api/customers';
import { DEFAULT_LANGUAGE_KEY } from '../../utils/globalVariables';
import { isUserAuthorized } from '../../utils/token';

type UserState = {
  userLanguage: string;
  isUserAuthorized: boolean;
  isLoading: boolean;
  errorMsg: string;
  userVersion: number;
  userId: string;
};

const initialUserState: UserState = {
  userLanguage: DEFAULT_LANGUAGE_KEY,
  isUserAuthorized: isUserAuthorized(),
  isLoading: false,
  errorMsg: '',
  userVersion: 1,
  userId: '',
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
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});
export default userSlice;
export const {
  setUserLogin,
  setUserVersion,
  setUserId,
  setUserLogout,
  setUserIsLoading,
  setUserError,
} = userSlice.actions;
