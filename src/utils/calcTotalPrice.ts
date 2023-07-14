import { CartItem } from "../redux/slices/CartSlice"

export const CalcTotalPrice = (items: CartItem[]) => {
    return items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
    }, 0)
}