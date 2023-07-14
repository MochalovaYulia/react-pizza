import { CartItem } from "../redux/slices/CartSlice";
import { CalcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) as CartItem[] : []; // если в localStorage что-то есть, то парсим 
    const totalPrice = CalcTotalPrice(items);

    return {
        items,
        totalPrice
    }
}