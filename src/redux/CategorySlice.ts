import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { categorysURL } from "../Api";

export const categorysApi: any = createAsyncThunk("categories", async () => {
    const response = await axios.get(categorysURL())
    return response.data
});

const CategorySlice = createSlice({
    name: "categorys",
    initialState: {
        categorys: [],
        loading: false,
    },
    extraReducers: {
        [categorysApi.pending]: (state: { loading: boolean; }) => {
            state.loading = true;
        },
        [categorysApi.fulfilled]: (
            state: { loading: boolean; categorys: any; },
            action: { payload: any; }
        ) => {
            state.loading = false;
            state.categorys = action.payload;
        },
        [categorysApi.rejected]: (state: { loading: boolean; }) => {
            state.loading = false;
        },
    },
    reducers: {}
});

export default CategorySlice.reducer;