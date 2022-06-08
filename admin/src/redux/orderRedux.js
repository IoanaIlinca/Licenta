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
        updateOrderStatus: (state, action) => {
            let index = state.orders.findIndex((item) => item._id === action.payload._id);
            state.orders[index].status = action.payload.status;
        }

    },
});

export const {
    resetError,
    getOrderStart,
    getOrderSuccess,
    getOrderFailure,
    updateOrderStatus
    } = orderSlice.actions;

export default orderSlice.reducer;