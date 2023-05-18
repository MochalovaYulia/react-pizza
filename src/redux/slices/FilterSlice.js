import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    currentPage: 1,
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
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        }
    }
})

export const { setCategoryId, setSort, setCurrentPage } = FilterSlice.actions; 
export default FilterSlice.reducer;