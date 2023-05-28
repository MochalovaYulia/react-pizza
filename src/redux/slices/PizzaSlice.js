import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: 'loading',
}

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzaStatus', async(params) => {
    const {order, sortBy, category, currentPage} = params
    const res = await axios.get(`https://645105d5a322196911587838.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`)
    return res.data
})

const PizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizzas(state, action) {
            state.items = action.payload
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.status = 'success'
            state.items = action.payload
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error'
            state.items = []
        }
    }
})

export const { setPizzas } = PizzaSlice.actions
export default PizzaSlice.reducer