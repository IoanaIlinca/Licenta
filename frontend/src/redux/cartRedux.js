import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
      //  ids: {},
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        updateProductQuantity: (state, action) => {
            state.products[action.payload.index].quantity += action.payload.quantity;
            state.total += action.payload.price * action.payload.quantity;
        },
        removeProduct: (state, action) => {
            state.total -= action.payload.price;
            state.quantity -= 1;
            state.products.splice(
                action.payload.index,
                1
            );

        },
        emptyCart: (state, action) => {
                state.total = 0;
                state.quantity = 0;
                state.products = [];
        }
    },
});

export const { addProduct, updateProductQuantity, removeProduct, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;