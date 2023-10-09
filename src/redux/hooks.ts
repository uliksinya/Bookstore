import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const parsePriceToNumber = (price: string) => {
    const newStr = price.replace('$', '');
    const numbStr = Number(newStr);
    return numbStr;
}