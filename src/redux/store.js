import { configureStore } from "@reduxjs/toolkit";
import FilterSlice from "./slices/FilterSlice";

export const store = configureStore({
    reducer: {
        filter: FilterSlice,
    },
});