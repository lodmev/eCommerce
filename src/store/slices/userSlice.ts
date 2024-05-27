import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { logoutUser } from '../../api/customers';
import { DEFAULT_LANGUAGE_KEY } from '../../utils/globalVariables';

type UserState = {
  userLanguage: string;
  isUserAuthorized: boolean;
  isLoading: boolean;
  errorMsg: string;
};

const initialUserState: UserState = {
  userLanguage: DEFAULT_LANGUAGE_KEY,
  isUserAuthorized: Boolean(window.sessionStorage.getItem('token')),
  isLoading: false,
  errorMsg: '',
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
  },
});
export default userSlice;
export const { setUserLogin, setUserLogout, setUserIsLoading, setUserError } = userSlice.actions;
