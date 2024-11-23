import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    leader: [],
    totalElements: 0,
    isLoading: false,
};

export const leaderSlice = createSlice({
    name: "leader",
    initialState,
    reducers: {
        getLeaderReducer: (state, action) => {
            return {
                ...state,
                leader: [...action.payload],
                totalElements: action.payload.length,
                isLoading: false
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    getLeaderReducer,
} = leaderSlice.actions;

export default leaderSlice.reducer;
