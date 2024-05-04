import { ChangeEvent, useReducer } from 'react';

type ValidateFunctionType = (val: string) => boolean;

enum InputActionType {
  INPUT,
  BLUR,
  RESET,
}

interface InputActions {
  type: InputActionType;
  payload?: string;
}

interface InputState {
  value: string;
  isTouched: boolean;
}

const inputStateReducer = (state: InputState, action: InputActions): InputState => {
  switch (action.type) {
    case InputActionType.INPUT:
      return {
        value: action.payload ?? '',
        isTouched: state.isTouched,
      };
    case InputActionType.BLUR:
      return {
        value: state.value,
        isTouched: true,
      };
    case InputActionType.RESET:
      return {
        value: '',
        isTouched: false,
      };
    default:
      return state;
  }
};

const useValidateInput = (validateValue: ValidateFunctionType, initialValue?: string) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, {
    value: initialValue ?? '',
    isTouched: false,
  });

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: InputActionType.INPUT, payload: e.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: InputActionType.BLUR });
  };

  const reset = () => {
    dispatch({ type: InputActionType.RESET });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useValidateInput;
