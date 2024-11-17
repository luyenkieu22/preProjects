import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    family: [],
    totalElements: 0,
    isLoading: false
};

export const familySlice = createSlice({
    name: "family",
    initialState,
    reducers: {
        getFamilyByIdReducer: (state, action) => {
            state.family = action.payload;
        },

        getFamilyByEmployeeIdReducer: (state, action) => {
            return {
                ...state,
                family: [...action.payload],
                totalElements: action.payload.length,
                isLoading: false
            }
        },

        addFamilyReducer: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },

        editFamilyReducer: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },

        deleteFamilyReducer: (state, action) => {
            return {
                ...state,
                isLoading: true
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    getFamilyByIdReducer,
    getFamilyByEmployeeIdReducer,
    addFamilyReducer,
    editFamilyReducer,
    deleteFamilyReducer,
} = familySlice.actions;

export default familySlice.reducer;
