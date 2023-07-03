import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum sortPropertyEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
    TITLE_DESC =  'title',
    TITLE_ASC =  '-title'
}

export type Sort = {
    name: string;
    sortProperty: sortPropertyEnum;
}

export interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort: Sort;
}

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: sortPropertyEnum.RATING_DESC,
    }
}

export const FilterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload;
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setFilter(state, action: PayloadAction<FilterSliceState>) {
            if(Object.keys(action.payload).length) {
                state.categoryId = Number(action.payload.categoryId)
                state.currentPage = Number(action.payload.currentPage)
                state.sort = action.payload.sort
            } else {
                state.currentPage = 1;
                state.categoryId = 1;
                state.sort = {
                    name: 'популярности',
                    sortProperty: sortPropertyEnum.RATING_DESC, 
                }
            }
        }
    }
})

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort

export const { setCategoryId, setSort, setCurrentPage, setFilter, setSearchValue } = FilterSlice.actions; 
export default FilterSlice.reducer;