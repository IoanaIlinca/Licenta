import { createSlice } from "@reduxjs/toolkit";

export const blockchainSlice = createSlice({
    name: "blockchain",
    initialState: {
        initialised: false,
        deployed: [],
        deployedOrders: [],
        entries: [],
    },
    reducers: {
        setInitialised: (state) => {
            state.initialised = true;
        },
        setDeployed: (state, action) => {
            state.deployed = action.payload;
        },
        updateDeployed: (state, action) => {
            let index = state.deployed.findIndex((item) => item.id === action.payload.id );
            if (index !== -1) {
                state.deployed[index].value = action.payload.value;
            }
            else {
                state.deployed.push(action.payload);
            }
        },
        updateDeployedProduct: (state, action) => {
            let index = state.deployed.findIndex((item) => item.id === action.payload.id );
            state.deployed[index].value = true;
        },
        updateDeployedOrders: (state, action) => {
            let index = state.deployedOrders.findIndex((item) => item.id === action.payload.id );
            if (index !== -1) {
                state.deployedOrders[index].value = action.payload.value;
            }
            else {
                state.deployedOrders.push(action.payload);
            }
        },
        updateEntries: (state, action) => {
            console.log(action.payload);
            let index = state.entries.findIndex((item) => (item.orderId === action.payload.orderId && item.productId === action.payload.productId));
            if (index !== -1) {
                state.entries[index].value = action.payload.value;
            }
            else {
                state.entries.push(action.payload);
            }
        },
        emptyEntries: (state) => {
            state.entries = [];
        }
    },
});

export const {
    setInitialised,
    setDeployed,
    updateDeployed,
    updateDeployedProduct,
    updateDeployedOrders,
    updateEntries,
    emptyEntries
} = blockchainSlice.actions;

export default blockchainSlice.reducer;