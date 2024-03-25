import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        add(state, action) {
            const existingItemIndex = state.findIndex(item => item._id === action.payload._id);
            if (existingItemIndex !== -1) {
                state[existingItemIndex].quantity++; // Increase quantity if item already exists in cart
            } else {
                state.push({ ...action.payload, quantity: 1 }); // Add item with quantity 1 if not already in cart
            }
        },

        remove(state, action) {
            return state.filter((item) => item._id !== action.payload);
        },

        increaseQuantity(state, action) {
            const { _id } = action.payload;
            const itemToUpdate = state.find(item => item._id === _id);
            if (itemToUpdate) {
                itemToUpdate.quantity++; // Increase quantity immutably
            }
        },

        decreaseQuantity(state, action) {
            const { _id } = action.payload;
            const itemToUpdate = state.find(item => item._id === _id);
            if (itemToUpdate && itemToUpdate.quantity > 1) {
                itemToUpdate.quantity--; // Decrease quantity immutably
            }
        },

        setQuantity(state, action) {
            const { _id, quantity } = action.payload;
            // Create a copy of the state array with the updated item
            return state.map(item =>
                item._id === _id ? { ...item, quantity: quantity } : item
            );
        }

    },
});

export const { add, remove, increaseQuantity, decreaseQuantity, setQuantity, removeAll } = cartSlice.actions;
export default cartSlice.reducer;



