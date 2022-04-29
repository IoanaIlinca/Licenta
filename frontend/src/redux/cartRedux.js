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
            /// Daca-s marimi sau culori diferite, fa-le separat
            /* let id = action.payload._id;
             console.log(id);
             console.log(state.ids);
             if (!.includes(id)) {
                 state.quantity += 1;
                 state.products.push(action.payload);
                 state.ids[state.products.length - 1] = id;
             }
             else {
                 state.products[state.ids[id]].quantity = action.payload.quantity;
             }
             state.total += action.payload.price * action.payload.quantity;*/
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
    },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;