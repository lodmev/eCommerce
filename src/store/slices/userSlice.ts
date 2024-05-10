import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type UserState = {
  isUserAuthorized: boolean;
  isLoading: boolean;
  errorMsg: string;
};

const initialUserState: UserState = {
  isUserAuthorized: false,
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
