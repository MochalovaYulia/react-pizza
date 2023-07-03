import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
}

export type FetchPizzasArgs = {
    order: string,
    sortBy: string,
    search: string, 
    category: string,
    currentPage: string
};

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    items: Pizza[];
    status: Status;
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
}

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>('pizza/fetchPizzaStatus', async(params) => {
    const {order, sortBy, search, category, currentPage} = params
    const {data} = await axios.get<Pizza[]>(`https://645105d5a322196911587838.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&search=${search}`)
    return data;
})

const PizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizzas(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload
        }
    },
    extraReducers: (bilder) => {
        bilder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING
            state.items = []
        });
        bilder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.status = Status.SUCCESS
            state.items = action.payload
        });
        bilder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR
            state.items = []
        });
    }
    // extraReducers: {
    //     [fetchPizzas.pending]: (state) => {
    //         state.status = 'loading'
    //         state.items = []
    //     },
    //     [fetchPizzas.fulfilled]: (state, action) => {
    //         state.status = 'success'
    //         state.items = action.payload
    //     },
    //     [fetchPizzas.rejected]: (state) => {
    //         state.status = 'error'
    //         state.items = []
    //     }
    // }
})

export const selectPizza = (state: RootState) => state.pizza;

export const { setPizzas } = PizzaSlice.actions
export default PizzaSlice.reducer