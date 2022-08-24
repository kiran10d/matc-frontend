import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { productsURL } from "../Api";

export const productsApi: any = createAsyncThunk("products", async () => {
    const response = await axios.get(productsURL())
    return response.data
});

const ProductsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
    },
    extraReducers: {
        [productsApi.pending]: (state: { loading: boolean; }) => {
            state.loading = true;
        },
        [productsApi.fulfilled]: (
            state: { loading: boolean; products: any; },
            action: { payload: any; }
        ) => {
            state.loading = false;
            state.products = action.payload;
        },
        [productsApi.rejected]: (state: { loading: boolean; }) => {
            state.loading = false;
        },
    },
    reducers: {}
});

export default ProductsSlice.reducer;