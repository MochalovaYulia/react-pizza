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