import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue: '',
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
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setFilter(state, action) {
            state.categoryId = Number(action.payload.categoryId)
            state.currentPage = Number(action.payload.currentPage)
            state.sort = action.payload.sort
        }
    }
})

export const selectFilter = state => state.filter;

export const { setCategoryId, setSort, setCurrentPage, setFilter, setSearchValue } = FilterSlice.actions; 
export default FilterSlice.reducer;