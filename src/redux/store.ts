import { useDispatch } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import FilterSlice from "./slices/FilterSlice";
import CartSlice from "./slices/CartSlice";
import PizzaSlice from "./slices/PizzaSlice";

export const store = configureStore({
    reducer: {
        filter: FilterSlice,
        cart: CartSlice,
        pizza: PizzaSlice, 
    },
});

type FuncType = typeof store.getState; //возвращает функцию (все хранилище)

export type RootState = ReturnType<FuncType>; //берет функцию и превращает ее содержимое в тип

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() //создали спецальный хук, который вызовет useDispatch, а внутрь его передаст типы с action. 