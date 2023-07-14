import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { CalcTotalPrice } from "../../utils/calcTotalPrice";
import { TotalPrice } from "../../utils/totalPrice";

export type CartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number; 
    count: number;
}

export interface CartSliceState {
    totalPrice: number;
    items: CartItem[];
}

const {items, totalPrice} = getCartFromLS();

const initialState: CartSliceState = {
    totalPrice,
    items,
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }

            state.totalPrice = CalcTotalPrice(state.items);
 
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find((obj) => obj.id === action.payload)
            if (findItem) {
                findItem.count--
            }
            state.totalPrice = TotalPrice(state.items);
        
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((item) => item.id !== action.payload)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        }

    }
})

export const selectCart = (state: RootState) => state.cart;
export const selectCartItem = (id: string) => (state: RootState) => state.cart.items.find(obj => obj.id === id)

export const { addItem, removeItem, clearItems, minusItem } = CartSlice.actions;
export default CartSlice.reducer;