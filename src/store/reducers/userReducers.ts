import { ErrorResponse, MyCustomerDraft, MyCustomerSignin } from '@commercetools/platform-sdk';
import { setUserError, setUserIsLoading, setUserLogin } from '../slices/userSlice';
import { UserDispatch } from '../store';
import { loginUser } from '../../api/customers';

export const loginReducer = (loginData: MyCustomerSignin) => async (dispatch: UserDispatch) => {
  try {
    dispatch(setUserIsLoading(true));
    await loginUser(loginData);
    dispatch(setUserLogin());
  } catch (e) {
    const err = e as ErrorResponse;
    dispatch(setUserError(err.message));
  } finally {
    dispatch(setUserIsLoading(false));
  }
};
export const registerReduser =
  async (registrationData: MyCustomerDraft) => async (dispatch: UserDispatch) => {
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
