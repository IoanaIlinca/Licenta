import { createSlice } from "@reduxjs/toolkit";

export const blockchainSlice = createSlice({
    name: "blockchain",
    initialState: {
        initialised: false,
        deployed: []
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
        }
    },
});

export const {
    setInitialised,
    setDeployed,
    updateDeployed,
    updateDeployedProduct
} = blockchainSlice.actions;

export default blockchainSlice.reducer;