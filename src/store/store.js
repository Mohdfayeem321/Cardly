import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import authSlice from "./authSlice";
import cartMiddleware from "./cartMiddleware";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        products: productSlice,
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartMiddleware),
});

export default store;