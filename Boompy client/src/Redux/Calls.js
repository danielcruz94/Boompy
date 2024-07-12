import { createSlice } from "@reduxjs/toolkit";

const callsActiveSlice = createSlice({
    name: "callsActive",
    initialState: false,
    reducers: {
        setActive: (state, action) => {
            return action.payload;
        },
        toggleActive: (state) => {
            return !state;
        }
    },
});

export const { setActive, toggleActive } = callsActiveSlice.actions;
export default callsActiveSlice.reducer;
