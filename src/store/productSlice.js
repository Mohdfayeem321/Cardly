import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    status: 'Idle'
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
    },
    extraReducers: (builders) => {
        builders
            .addCase(getProducts.pending, (state, action) => {
                state.status = 'Loading'
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'Idle'

            })
            .addCase(getProducts.rejected, (state, action) => {
                state.data = action.payload;
                state.status = 'Error'

            })
    },
});

export const { fetchProducts } = productSlice.actions;
export default productSlice.reducer;

export const getProducts = createAsyncThunk("products/get", async () => {
    const data = await fetch("http://localhost:5000/api/product");
    const result = await data.json();
    return result;
});