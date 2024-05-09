import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { UserDispatch, UserState } from '../store/store';

export const useUserDispatch = () => useDispatch<UserDispatch>();
export const useUserSelector: TypedUseSelectorHook<UserState> = useSelector;
