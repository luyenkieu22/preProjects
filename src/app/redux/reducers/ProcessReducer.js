import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    process: [],
    isLoading: false,
    totalElements: 0
};

export const processSlice = createSlice({
    name: "process",
    initialState,
    reducers: {
        getProcessByIdReducer: (state, action) => {
            state.process = action.payload;
        },

        getProcessByEmployeeReducer: (state, action) => {
            return {
                ...state,
                process: [...action.payload],
                totalElements: action.payload.length,
                isLoading: false
            }
        },

        getProcessByLeaderReducer: (state, action) => {
            return {
                ...state,
                process: [...action.payload],
                totalElements: action.payload.length,
                isLoading: false
            }
        },

        addProcessReducer: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },

        editProcessReducer: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },

        deleteProcessReducer: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    getProcessByIdReducer,
    getProcessByEmployeeReducer,
    getProcessByLeaderReducer,
    addProcessReducer,
    editProcessReducer,
    deleteProcessReducer,
} = processSlice.actions;

export default processSlice.reducer;
