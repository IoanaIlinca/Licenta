import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        resetError: (state) => {
            state.error = false;
        },
        //GET ALL
        getOrderStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getOrderSuccess: (state, action) => {
            state.isFetching = false;
            state.orders = action.payload;
        },
        getOrderFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    resetError,
    getOrderStart,
    getOrderSuccess,
    getOrderFailure,
    } = orderSlice.actions;

export default orderSlice.reducer;