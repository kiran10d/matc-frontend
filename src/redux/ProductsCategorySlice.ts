import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { productsCategorysURL } from "../Api";

export const productsCategorysApi: any = createAsyncThunk("products/categories", async () => {
    const response = await axios.get(productsCategorysURL())
    return response.data
});


const ProductsCategorySlice = createSlice({
    name: "productsCategorys",
    initialState: {
        productsCategorys: [],
        loading: false,
    },
    extraReducers: {
        [productsCategorysApi.pending]: (state: { loading: boolean; }) => {
            state.loading = true;
        },
        [productsCategorysApi.fulfilled]: (
            state: { loading: boolean; productsCategorys: any; },
            action: { payload: any; }
        ) => {
            state.loading = false;
            state.productsCategorys = {...action.payload}
            console.log("in red")
        },
        [productsCategorysApi.rejected]: (state: { loading: boolean; }) => {
            state.loading = false;
        },
    },
    reducers: {}
});

export default ProductsCategorySlice.reducer;