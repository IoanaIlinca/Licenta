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
    },
});

export const {
    setInitialised,
    setDeployed
} = blockchainSlice.actions;

export default blockchainSlice.reducer;