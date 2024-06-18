import { ErrorResponse, MyCustomerDraft, MyCustomerSignin } from '@commercetools/platform-sdk';
import {
  setUserError,
  setUserId,
  setUserIsLoading,
  setUserLogin,
  setUserVersion,
} from '../slices/userSlice';
import { StoreDispatch } from '../store';
import { loginUser } from '../../api/customers';
import { fetchCartData } from '../slices/basketSlice';

export const loginReducer = (loginData: MyCustomerSignin) => async (dispatch: StoreDispatch) => {
  try {
    dispatch(setUserIsLoading(true));
    const { version, id } = await loginUser(loginData);
    dispatch(setUserLogin());
    dispatch(setUserVersion(version));
    dispatch(setUserId(id));
    dispatch(fetchCartData());
  } catch (e) {
    const err = e as ErrorResponse;
    dispatch(setUserError(err.message));
  } finally {
    dispatch(setUserIsLoading(false));
  }
};
export const registerReduser =
  async (registrationData: MyCustomerDraft) => async (dispatch: StoreDispatch) => {
    try {
      dispatch(setUserIsLoading(true));
      await loginUser(registrationData);
      dispatch(setUserLogin());
    } catch (e) {
      const err = e as ErrorResponse;
      dispatch(setUserError(err.message));
    } finally {
      dispatch(setUserIsLoading(false));
    }
  };
