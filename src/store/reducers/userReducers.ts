import { ErrorResponse, MyCustomerDraft, MyCustomerSignin } from '@commercetools/platform-sdk';
import {
  setUserError,
  setUserId,
  setUserIsLoading,
  setUserLogin,
  setUserVersion,
} from '../slices/userSlice';
import { type StoreDispatch } from '../store';
import { loginUser } from '../../api/customers';
import { setCartData } from '../slices/basketSlice';

export const loginReducer = (loginData: MyCustomerSignin) => async (dispatch: StoreDispatch) => {
  try {
    dispatch(setUserIsLoading(true));
    const { customer, cart } = await loginUser(loginData);
    const { version, id } = customer;
    if (cart) dispatch(setCartData(cart));
    dispatch(setUserLogin());
    dispatch(setUserVersion(version));
    dispatch(setUserId(id));
  } catch (e) {
    const err = e as ErrorResponse;
    dispatch(setUserError(err.message));
  } finally {
    dispatch(setUserIsLoading(false));
  }
};
export const registerReducer =
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
