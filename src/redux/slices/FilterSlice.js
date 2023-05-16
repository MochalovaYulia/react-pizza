import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    sort: {
        name: 'популярности',
        sortProperty: 'rating' 
    }
}

export const FilterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
            state.sort = action.payload;
        }
    }
})

export const { setCategoryId, setSort } = FilterSlice.actions; 
export default FilterSlice.reducer;